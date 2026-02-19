import { Command } from '@oclif/core';
import { exec } from 'child_process';
import { error } from 'console';

export default class open extends Command {
    async run(){
        const folderpath='/home/tyro24001/lens_ai_test_pilot/lens_ai_test_pilot';
        const command ='code $ {foderpath}';
        exec(command,(error)=>{
            if(error){
                this.error('Failed in openign the folder  ${error.message }') ;
            }
            else{
                this.log('Sucessfully opened ${foderpath}');
            }
        });
    }

}