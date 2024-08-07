import { Lifegame1 } from "./Lifegame1";
import { Params } from "./Params";
import { RuleMap } from "./RuleMap";


export class Lifegame{


    public output:Uint8Array;

    lifegame1:Lifegame1;
    lifegame2:Lifegame1;
    lifegame3:Lifegame1;
    frame:number = 0;
    light:number = 0;
    ruleMap:RuleMap;

    time:number = 0;
    //caType:number = 0;

    // new Uint8Array(64*64*3);


    constructor(){

        //this.caType = Params.caType;
        this.ruleMap = new RuleMap();
        this.output = new Uint8Array(64*64*3);
        this.lifegame1 = new Lifegame1(this.ruleMap);
        this.lifegame2 = new Lifegame1(this.ruleMap);
        this.lifegame3 = new Lifegame1(this.ruleMap);

    }

    public update(){

        if(this.frame%(64*4)==0){
            //this.ruleMap.setRandom();
            //this.light=1;
        }

        this.frame++;
        
        this.ruleMap.update(this.frame);
        this.lifegame1.update(0);
        this.lifegame2.update(1);
        this.lifegame3.update(2);    
        
        let listA = this.lifegame1.getDots();//getGrid();
        let listB = this.lifegame2.getDots();//getGrid();
        let listC = this.lifegame3.getDots();//getGrid();


        this.light+=(0-this.light)/10;

        for(let i=0;i<64;i++){
            for(let j=0;j<64;j++){
                let idx = i+j*64;
                let ox = 0;//Math.floor(20*(0.5+0.5*Math.sin(j*0.1+this.frame*0.1))); 

                this.output[idx*3+0] = listA[j][(i+ox)%64]*115;
                this.output[idx*3+1] = listB[j][(i+ox)%64]*115;//Math.floor(this.light*255);
                this.output[idx*3+2] = listC[j][(i+ox)%64]*155;
            }
        }

        /*
        let ruleRects = this.ruleMap.rects;
        for(let i=0;i<ruleRects.length;i++){
            let rect = ruleRects[i];
            let idx = rect.x + rect.y*64;
            this.output[idx*3+0] = 255;
        }*/

        //console.log(this.output);

    }

}