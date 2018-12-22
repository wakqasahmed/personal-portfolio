import { css } from 'react-emotion';

const custom = css`
    .box {
        position: relative;
        width: 6em;
        height: 2em;
        box-sizing: border-box;
        text-align: center;
        margin: 0 0;
        /*background: #e9e9e9;*/
        background: #9B3DDE;
        display: inline-block;
        box-shadow: 6px 6px 3px 0px rgba(122,117,122,0.15);

        .icon {
            width: 100%;
            height: 100%;
            
            transition: 0.5s;
            transform-origin: top;
            transform: translateY(0) rotateX(0deg);

            /*animation: rotateicon 2s infinite linear;*/

            .fas {
                font-size: 1em;
                line-height: 2em;
                /*color: #999;*/
                color: #F5F2F4;
            }
            
            .fa-link {
                font-size: 0.75em;
            }
        }

        .details {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /*background: #d6d6d6;*/
            background: #7341E4;

            transition: 0.5s;
            transform-origin: bottom;
            transform: translateY(-2em) rotateX(90deg);

            /*animation: rotatedetail 2s infinite linear;*/

            h2{
                line-height: 2em;
            }

        }  

        &:hover, &:focus {
            .icon {
                transform: translateY(100%) rotateX(90deg);  
            }

            .details {
                transform: translateY(0) rotateX(0deg);
            }        
        }
    }

    @keyframes rotateicon {
        50% {
            transform: translateY(0px) rotateX(0deg);
        }
        100% {
            transform: translateY(100%) rotateX(90deg); 
        }        
    }    

    @keyframes rotatedetail {
        50% {
            transform: translateY(-2em) rotateX(90deg);
        }
        100% {
            transform: translateY(0) rotateX(0deg);
        }        
    }     
`;

export default custom;
