import Image from 'next/image';
import styles from './DefaultButton.module.scss'

interface DefaultButtonProps {
    default: boolean;
}

const DefaultButton=(props: DefaultButtonProps)=>{
    return(
        <div className=''>
            {props.default?(

                <div className={styles['default']}>DEFAULT</div>
            ):(
                <div className={styles['organizing']}>
                    <div className={styles['makeDefault']}>MAKE DEFAULT</div>
                    <Image className='' alt={'xmark'} src={'/xmark.svg'} width={18} height={18} />
                </div>
                
            )}
        </div>
    );
};

export default DefaultButton;