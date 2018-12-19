import { css } from 'react-emotion';

const custom = css`
    .box {
        position: relative;
        width: 6em;
        height: 2em;
        box-sizing: border-box;
        text-align: center;
        margin: 0 0;
        background: #e9e9e9;
        display: inline-block;
        box-shadow: 6px 6px 3px 0px rgba(122,117,122,0.15);

        .icon {
            width: 100%;
            height: 100%;
            transition: 0.5s;
            transform-origin: top;
            transform: translateY(0) rotateX(0deg);

            .fas {
                font-size: 1em;
                line-height: 2em;
                color: #999;
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
            background: #d6d6d6;
            transition: 0.5s;
            transform-origin: bottom;
            transform: translateY(-2em) rotateX(90deg);
        }  

        &:hover, &:focus {
            .icon {
                transform: translateY(100%) rotateX(90deg);  
            }

            .details {
                transform: translateY(0) rotateX(0deg);

                h2 {
                    line-height: 2em;
                }            
            }        
        }  
    }
`;

export default custom;
