import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => (size + (scale(size) - size)) * factor;
const fontScale = size => Math.min(scale(size), verticalScale(size));
// Use imageScale for width/hieght/borderRadius of rounded images
const imageScale = size => Math.max(scale(size), verticalScale(size));
export { scale, verticalScale, moderateScale, fontScale, imageScale };
