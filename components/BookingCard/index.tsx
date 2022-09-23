
import Image from 'next/image';
import styles from './BookingCard.module.scss';


export type Booking = {
    id: string;
    area: string;
    name: string;
    endDate: string;
    availableDays: Array<string>;
    duration: string;
    startDate: string;
    img: string;
    status: string;
};

const BookingCard = (props: { bookingData: Booking[] }) => {

    const rejected=props.bookingData.filter((booking)=> booking.status==="REJECTED");
    const requested=props.bookingData.filter((booking)=> booking.status==="REQUESTED");
    const canceled=props.bookingData.filter((booking)=> booking.status==="CANCELED");
    const confirmed=props.bookingData.filter((booking)=> booking.status==="CONFIRMED");

    return (

        <div className={styles['bookingCard']}>

            <div className="requested">
                <h4>Requested</h4>

                {requested.length === 0 ?(
                    <p>No confirmed bookings yet.</p>
                ):(
                    requested.map(({id, area, name, endDate, availableDays,duration,startDate,img})=>
                        <div className={styles['bookingBlock']}>
                            <div className={styles['bookingBlock__imgtext']}>
                                <Image alt={'Kitchen Image'} src={img} width={350} height={250} />
                                <div className={styles['bookingBlock__text']}>
                                    <h5>{name} in {area}</h5>
                                    <h6>{availableDays.join(", ")} <br /> {startDate}-{endDate} ({duration})</h6>
                                    <h6>Booking ref: <br />{id}</h6>
                                </div>
                            </div>
                            <button>DELETE</button>
                        </div>
                    )
                    
                )}

                <hr />
            </div>

            <div className="confirmed">
                <h4>Confirmed</h4>

                {confirmed.length === 0 ?(
                    <p>No confirmed bookings yet.</p>
                ):(
                    confirmed.map(({id, area, name, endDate, availableDays,duration,startDate,img})=>
                        <div className={styles['bookingBlock']}>
                            <div className={styles['bookingBlock__imgtext']}>
                                <Image alt={'Kitchen Image'} src={img} width={350} height={250} />
                                <div className={styles['bookingBlock__text']}>
                                    <h5>{name} in {area}</h5>
                                    <h6>{availableDays.join(", ")} <br /> {startDate}-{endDate} ({duration})</h6>
                                    <h6>Booking ref: <br />{id}</h6>
                                </div>
                            </div>
                            <button>DELETE</button>
                        </div>
                    )
                    
                )}
         

                <hr />


            </div>

            <div className="canceled">
                <h4>Canceled</h4>

                {canceled.length === 0 ?(
                    <p>No confirmed bookings yet.</p>
                ):(
                    canceled.map(({id, area, name, endDate, availableDays,duration,startDate,img})=>
                        <div className={styles['bookingBlock']}>
                            <div className={styles['bookingBlock__imgtext']}>
                                <Image alt={'Kitchen Image'} src={img} width={350} height={250} />
                                <div className={styles['bookingBlock__text']}>
                                    <h5>{name} in {area}</h5>
                                    <h6>{availableDays.join(", ")} <br /> {startDate}-{endDate} ({duration})</h6>
                                    <h6>Booking ref: <br />{id}</h6>
                                </div>
                            </div>
                            <button>DELETE</button>
                        </div>
                    )
                    
                )}

                <hr />


            </div>

            <div className="rejected">
                <h4>Rejected</h4>

                {rejected.length === 0 ?(
                    <p>No confirmed bookings yet.</p>
                ):(
                    rejected.map(({id, area, name, endDate, availableDays,duration,startDate,img})=>
                        <div className={styles['bookingBlock']}>
                            <div className={styles['bookingBlock__imgtext']}>
                                <Image alt={'Kitchen Image'} src={img} width={350} height={250} />
                                <div className={styles['bookingBlock__text']}>
                                    <h5>{name} in {area}</h5>
                                    <h6>{availableDays.join(", ")} <br /> {startDate}-{endDate} ({duration})</h6>
                                    <h6>Booking ref: <br />{id}</h6>
                                </div>
                            </div>
                            <button>DELETE</button>
                        </div>
                    )
                    
                )}

                <hr />
            </div>

        </div>
    );

};

export default BookingCard;