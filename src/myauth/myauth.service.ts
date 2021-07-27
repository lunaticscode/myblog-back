import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2 } from 'crypto'
import { v4 as uuidv4 } from 'uuid';
import * as redis from 'ioredis';
import { API_RESULT } from 'src/_common';
import { REDIS } from '../_common';
const redisClient = new redis( REDIS.PORT , '127.0.0.1');
const IS_DEBUG = ( process.env.MODE === "LOCAL" );

const validatePassword = async ( password:string ) => {
        return await new Promise( (resolve, reject) => {
            pbkdf2(password, process.env.HASH_SALT, parseInt(process.env.HASH_ROUND), 64, process.env.HASH_ALGO, (err, key) => {
                if( err ) {
                    IS_DEBUG && console.log(err);
                    resolve(false);
                }
                IS_DEBUG && console.log(key.toString('base64'));
                resolve( key.toString('base64') );
            })
        })
}

const generateToken = async() => {
    return await new Promise( (resolve, reject) => {
        randomBytes(32, (err, buf) => {
            pbkdf2( uuidv4(), buf.toString('base64'), parseInt( process.env.HASH_ROUND ), 32, process.env.HASH_ALGO, (err, key) => {
                if( err ) { console.log(err); resolve(false) }
                const token = key.toString('base64');
                IS_DEBUG && console.log(token);
                resolve(token);
            })        
        })
    })
}

//* 토큰 생성 후, Redis로 저장.
//* tokenId: token
//* tokenId 는 세션으로
const createTokenAndSave = async () => {
    //const tokenId = uuidv4();
    //IS_DEBUG && console.log('tokenId => ', tokenId);
    const tokenValue = await generateToken();
    IS_DEBUG && console.log( 'createTokenAndSave() ::: token => ', tokenValue );
    const setResult = await redisClient.setex( 'adminToken', REDIS.EXPIRE_TIME, tokenValue );
    if( setResult === 'OK' ){
        return tokenValue;
    }
}

const validateToken = async( tokenValue ) => {
    const redisTokenValue = await redisClient.get( 'adminToken' );
    console.log(redisTokenValue);
    if( redisTokenValue === tokenValue ){
        return true;
    }
    return false;
}

//@Injectable()
export class MyauthService {
    async validateAdminPassword( loginPassword: string, dbPassword: string ): Promise<object | boolean> {
        IS_DEBUG && console.log( 'validateAdminPassword() exec ::: loginPassword, dbPassword => ', loginPassword, dbPassword );
        const hasedLoginPassword =  await validatePassword( loginPassword );
        if( hasedLoginPassword && hasedLoginPassword === dbPassword ){
            IS_DEBUG && console.log('exec generate admin token....');
            const tokenValue = await createTokenAndSave();
            IS_DEBUG && console.log('tokenId => ', tokenValue);
            return { result: true, token: tokenValue };
        }else{
            return { result: false, type: 'password'};
        }
    }

    async validateAdminToken( tokenValue: string ): Promise<object> {
        const result = await validateToken( tokenValue );
        if( result ){
            return { res: API_RESULT.SUCCESS }   
        }else{
            return { res: API_RESULT.FAIL, msg: "invalid-token" }
        }
    }
}
