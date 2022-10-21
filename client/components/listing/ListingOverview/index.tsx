import Image from 'next/image';
import { FrequencyEnum } from '~/codegen';
import PriceLine from '../../create/PriceLine';
import { BookingProvider } from '../BookingContext';
import ListingSideBar from '../ListingSideBar/ListingSideBar';
import styles from "./ListingOverview.module.scss";

export type ListingOverViewProps = {
    handle: string,
    owner?: any,
    hideSidebar: boolean,
    title: string,
    hourlyPrice: number,
    serviceFee: number,
    deposit: number,
    size: number,
    pickup?: boolean | null | undefined,
    facilities: string[],
    description: string,
    rules: string[],
    startDate: string,
    endDate: string,
    images: string[],
    frequency: FrequencyEnum
}


function ListingOverview({ listingsData }: { listingsData: ListingOverViewProps }) {
    const startDate = new Date(Number.parseInt((listingsData.startDate as any)))
    const endDate = new Date(Number.parseInt((listingsData.endDate as any)))
    return (
        <div className={styles["grid"]}>
            {listingsData.hideSidebar ? <p></p> : <div className={styles["sidebarContainer"]}>
                <BookingProvider>
                    <ListingSideBar handle={listingsData.handle} owner={listingsData.owner} />
                </BookingProvider>
            </div>}

            <div className={styles['listingoverview']}>
                <div className={styles['formItem']}>
                    <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
                    <div className={styles["gallery__container"]}>
                        <div className={styles["gallery"]}>
                            {listingsData.images.map((image, index) => (
                                <div key={"key-image-" + image} className={styles['gallery__item'] + ' ' + styles['gallery__item--' + index]}>
                                    <Image src={image} width={460} height={516} className={styles["gallery__img"]} alt={'Image ' + index} key={"image--" + index.toString()} />
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
                            <p className="body-text-secondary">{listingsData.pickup === false ? "No" : "Yes"}</p>
                        </div>
                    </div>
                    <div className={styles['listingoverview__featureTagWrapper']}>
                        {listingsData.facilities.map((feature: string) => (
                            <span key={"span-key-" + feature} className={styles["feature-tag"]}>
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