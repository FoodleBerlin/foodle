import Stories, { WithSeeMore } from 'react-insta-stories';
import { useIntl } from 'react-intl';
import styles from '../../styles/pages/Home.module.scss';
import ConstructionPopup from './ConstructionPopup';
import SwiperCard, { KitchenCardInfo } from './SwiperCard';

export type StoryCarouselProps = {
  cardInfo: KitchenCardInfo[];
  width: number;
};
const StoryCarousel = (props: StoryCarouselProps) => {
  const intl = useIntl();
  const seeMoreObj = ({ close }: { close: () => void }) => {
    return (
      <>
        <ConstructionPopup screenWidth={props.width} close={close} />
      </>
    );
  };
  const contentObj = (index: number, card: KitchenCardInfo) => {
    return {
      content: ({ action, story }: { action: any; story: any }) => {
        return (
          <WithSeeMore story={story} action={action}>
            <SwiperCard width={props.width} index={index} cardInfo={card} />
          </WithSeeMore>
        );
      },
    };
  };
  const getStories = () => {
    const stories: any = [];
    for (let i = 0; i < 6; i++) {
      stories.push({
        header: {
          heading: props.cardInfo[i].cityRegion,
          profileImage: props.cardInfo[i].cityRegion,
          subheading: props.cardInfo[i].cityRegion,
        },
        seeMore: seeMoreObj,
        content: contentObj(i, props.cardInfo[i]).content,
      });
    }
    return stories;
  };

  return (
    <div className={styles['stories-wrapper']}>
      <Stories stories={getStories()} defaultInterval={15000} loop width={'calc(30rem + 8vw)'} height={'50rem'} />
    </div>
  );
};
export default StoryCarousel;
