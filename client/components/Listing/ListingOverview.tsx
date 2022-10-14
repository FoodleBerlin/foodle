import Image from 'next/image';
import { UploaderImg } from "../Create/wizard/Step4";
import { FormData } from "../Create/wizard/Wizard";
import PriceLine from '../PriceLine';
import { BookingProvider } from './BookingContext';
import styles from "./ListingOverview.module.scss";
import ListingSideBar from './ListingSideBar';


function ListingOverview({ listingsData, handle, owner, hideSidebar = false }: { listingsData: FormData, handle: string, owner: any, hideSidebar: boolean }) {
    const startDate = new Date(listingsData.startDate);
    const endDate = new Date(listingsData.endDate);
    return (
        <div className={styles["grid"]}>
            {hideSidebar ? <p></p> : <div className={styles["sidebarContainer"]}>
                <BookingProvider>
                    <ListingSideBar listingsData={listingsData} handle={handle} owner={owner} />
                </BookingProvider>
            </div>}

            <div className={styles['listingoverview']}>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
                    <div className="gallery__container">
                        <div className="gallery">
                            {listingsData.images.map((image: UploaderImg, index) => (
                                <div key={"key-image-" + image.fileName} className={'gallery__item gallery__item--' + index}>
                                    <Image src={image.url} width={460} height={516} className="gallery__img" alt={'Image ' + index} key={"image--" + index.toString()} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles['listingoverview__titleWrapper'] + ' ' + styles['step2__marginHeadline']}>
                        <h3 className="header-tertiary">{listingsData.title}</h3>
                        <div className={styles['listingoverview__flexWrapper']}>
                            <p className="body-text">{listingsData.hourlyPrice}</p>
                            <p className="body-text">€/h</p>
                        </div>
                    </div>
                </div>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Overview</h2>
                    <div className={styles['listingoverview__flexWrapper']}>
                        <p className="body-text-secondary">Size -&nbsp; </p>
                        <p className="body-text-secondary">{listingsData.size}</p>
                        <p className="body-text-secondary">&nbsp;square meters</p>
                    </div>
                    <br />
                    <div className={styles['formItem']}>
                        <div className={styles['listingoverview__flexWrapper']}>
                            <p className='body-text-secondary'>Pickup: - &nbsp;</p>
                            <p className="body-text-secondary">{listingsData.pickup == "pickup-no" ? "No" : "Yes"}</p>
                        </div>
                    </div>
                    <div className={styles['listingoverview__featureTagWrapper']}>
                        {listingsData.facilities.map((feature: string) => (
                            <span key={"span-key-" + feature} className="feature-tag">
                                <p key={"p-feature-" + feature}>{feature.toUpperCase()}</p>
                            </span>
                        ))}
                    </div>
                    <br />
                    <p className="small-text">{listingsData.description}</p>
                    <div className={styles['listingoverview__overview--container']}>
                        <Image
                            src="/landing-2.jpg"
                            width={460}
                            height={516}
                            className={styles['listingoverview__overview--img']}
                            alt="Image 1"
                        />
                    </div>
                </div>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Pricing</h2>
                    <PriceLine label="Rental Fee" text={listingsData.hourlyPrice + '€ / hr'} />
                    <PriceLine label="Booking Fee" text={listingsData.hourlyPrice + '€ / hr'} />
                    <PriceLine label="Service Fee" text={listingsData.serviceFee + '€'} />
                    <PriceLine label="Deposit" text={listingsData.deposit + '€'} />
                    <PriceLine label="Cancellation Type" text="Full Refund 2 weeks before, partial after." />
                </div>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Rules</h2>
                    <p className="small-text">
                        {listingsData.rules}
                    </p>
                </div>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Availability</h2>
                    <div className={styles['listingoverview__availabilityGrid']}>
                        <div className={styles['listingoverview__availabilityDate']}>
                            <p className='small-text'>{startDate.toLocaleDateString("default", { day: "2-digit" })}</p>
                            <p className="small-text">{startDate.toLocaleDateString("default", { month: "long" })}</p>
                            <p className="small-text">{startDate.toLocaleDateString("default", { year: "numeric" })}</p>
                            <p className='small-text bold'>to</p>
                            <p className='small-text'>{endDate.toLocaleDateString("default", { day: "2-digit" })}</p>
                            <p className="small-text">{endDate.toLocaleDateString("default", { month: "long" })}</p>
                            <p className="small-text">{endDate.toLocaleDateString("default", { year: "numeric" })}</p>
                        </div>
                        <div className={styles['listingoverview__bookingFrequency']}>
                            <p className='small-text'>Frequency: {listingsData.frequency.toString()}</p>
                        </div>
                    </div>
                </div>
                <div className={styles['listingoverview__thingsToKnowContainer']}></div>
            </div>
        </div >
    );
}

export default ListingOverview;