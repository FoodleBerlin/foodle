
import Image from 'next/image';
import React from 'react';
import styles from './BookingCard.module.scss'


export type Booking ={
    id: string;
    area: string;
    name:string;
    endDate: string;
    availableDays: Array<string>;
    duration: string;
    startDate: string;
    img: string;
    status: string;
};

const BookingCard=(props: Booking)=> {
    
    return (

        <div className={styles['bookingCard']}>

            <div className="requested">
                <h4>Requested</h4>

                if({props.status}=='REQUESTED'){
                    <div className=''>
                        <div className=''>
                            <Image alt={'Kitchen Image'} src={props.img} width={350} height={250} />
                            <div className=''>
                                <h5>{props.name} in {props.area}</h5>
                                <h6>{props.availableDays.join(", ")} <br /> {props.startDate}-{props.endDate} ({props.duration})</h6>
                                <h6>Booking ref: <br />{props.id}</h6>
                            </div>
                        </div>
                        <button>DELETE</button>
                    </div>
                }
                 <hr />
            </div>

            <div className="confirmed">
                <h4>Confirmed</h4>

                if({props.status}=='CONFIRMED'){
                    <div className=''>
                        <div className=''>
                            <Image alt={'Kitchen Image'} src={props.img} width={350} height={250} />
                            <div className=''>
                                <h5>{props.name} in {props.area}</h5>
                                <h6>{props.availableDays.join(", ")} <br /> {props.startDate}-{props.endDate} ({props.duration})</h6>
                                <h6>Booking ref: <br />{props.id}</h6>
                            </div>
                        </div>
                        <button>DELETE</button>
                    </div>
                }
                 <hr />


            </div>

            <div className="canceled">
                <h4>Canceled</h4>

                if({props.status}=='CANCELED'){
                    <div className=''>
                        <div className=''>
                            <Image alt={'Kitchen Image'} src={props.img} width={350} height={250} />
                            <div className=''>
                                <h5>{props.name} in {props.area}</h5>
                                <h6>{props.availableDays.join(", ")} <br /> {props.startDate}-{props.endDate} ({props.duration})</h6>
                                <h6>Booking ref: <br />{props.id}</h6>
                            </div>
                        </div>
                        <button>DELETE</button>
                    </div>
                }
                 <hr />


            </div>

            <div className="rejected">
                <h4>Rejected</h4>

                if({props.status}=='REJECTED'){
                    <div className=''>
                        <div className=''>
                            <Image alt={'Kitchen Image'} src={props.img} width={350} height={250} />
                            <div className=''>
                                <h5>{props.name} in {props.area}</h5>
                                <h6>{props.availableDays.join(", ")} <br /> {props.startDate}-{props.endDate} ({props.duration})</h6>
                                <h6>Booking ref: <br />{props.id}</h6>
                            </div>
                        </div>
                        <button>DELETE</button>
                    </div>
                }
                 <hr />


            </div>

        </div>
    );

};

export default BookingCard;