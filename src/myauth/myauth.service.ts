import { Injectable } from '@nestjs/common';
import { pbkdf2 } from 'crypto'
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

//@Injectable()
export class MyauthService {
    async validateAdminPassword( loginPassword: string, dbPassword: string ): Promise<object | boolean> {
        console.log( 'validateAdminPassword() exec ::: loginPassword, dbPassword => ', loginPassword, dbPassword );
        const hasedLoginPassword =  await validatePassword( loginPassword );
        if( hasedLoginPassword && hasedLoginPassword === dbPassword ){
            IS_DEBUG && console.log('exec generate admin token....');
            return true;
        }else{
            return false;
        }
    }
}
