import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  LinearTransition,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { Reward } from '../types';
import { images } from '../assets';
import { height } from '../services';

interface RewardListItemProps {
  item: Reward
  claimed: boolean
  onCollect?: (item: Reward) => void
}

const RewardListItem = ({ item, claimed, onCollect }: RewardListItemProps) => {
  const resolvedSource = useMemo(() => item.image ? { uri: item.image } : images.rewardDefault, [item.image]);
  const opacitySV = useSharedValue(claimed && onCollect ? 0.3 : 1);
  const rotationSV = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacitySV.value,
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotationSV.value}deg` },
    ],
  }));

  const handleCollectPress = useCallback(() => {
    if (onCollect) {
      opacitySV.value = withTiming(0.3, { duration: 350 });
      rotationSV.value = withTiming(rotationSV.value + 360, { duration: 350 });
      onCollect(item);
    }
  }, [item, onCollect, opacitySV, rotationSV]);

  return (
    <Animated.View
      layout={LinearTransition}
      style={[style.container, animatedContainerStyle]}>
        <FastImage
          source={resolvedSource}
          style={[style.image]}
        />
        <View style={style.titleContainer}>
          <Text numberOfLines={1} style={style.title}>{item.name}</Text>
          {onCollect && (
            <Pressable disabled={claimed} onPress={handleCollectPress}>
              <Animated.View
                layout={LinearTransition}
                entering={FadeIn.duration(350)}
                exiting={FadeOut.duration(350)}
                key={claimed ? 'claimed' : 'unclaimed'}
              >
                <FastImage source={claimed ? images.rewardClaimed : images.claimReward} style={style.icon}/>
              </Animated.View>
            </Pressable>
          )}
        </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    flex: 1,
    marginRight: 10,
    minWidth: 0,
  },
  image: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default RewardListItem;
