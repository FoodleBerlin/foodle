import Image from 'next/image';
import styles from './DefaultButton.module.scss'

interface DefaultButtonProps {
    default: boolean;
}

const DefaultButton=(props: DefaultButtonProps)=>{
    return(
        <div className=''>
            {props.default?(
                <div className="">DEFAULT</div>
            ):(
                <div className=''>
                    <div className="">MAKE DEFAULT</div>
                    <Image className='' alt={'xmark'} src={'/xmark.svg'} width={15} height={15} />
                </div>
                
            )}
        </div>
    );
};

export default DefaultButton;