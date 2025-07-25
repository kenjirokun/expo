import { ConfigPlugin } from '@expo/config-plugins';

import {
  applyImageToSplashScreenXML,
  IBSplashScreenDocument,
  ImageContentMode,
  removeImageFromSplashScreen,
} from './InterfaceBuilder';
import { IOSSplashConfig } from './getIosSplashConfig';
import { withIosSplashScreenStoryboard } from './withIosSplashScreenStoryboard';

export const withIosSplashScreenImage: ConfigPlugin<IOSSplashConfig> = (config, props) => {
  return withIosSplashScreenStoryboard(config, (config) => {
    config.modResults = applySplashScreenStoryboard(config.modResults, props);
    return config;
  });
};

export function applySplashScreenStoryboard(obj: IBSplashScreenDocument, splash: IOSSplashConfig) {
  const resizeMode = splash?.resizeMode;
  const splashScreenImagePresent = Boolean(splash?.image);
  const imageName = splash.enableFullScreenImage_legacy ? 'SplashScreenLegacy' : 'SplashScreenLogo';
  // Only get the resize mode when the image is present.
  if (splashScreenImagePresent) {
    const contentMode = getImageContentMode(resizeMode || 'contain');
    return applyImageToSplashScreenXML(obj, {
      contentMode,
      imageName,
      backgroundColor: splash.backgroundColor,
      enableFullScreenImage: splash.enableFullScreenImage_legacy ?? false,
      imageWidth: splash.imageWidth,
    });
  }

  return removeImageFromSplashScreen(obj, { imageName });
}

function getImageContentMode(resizeMode: string): ImageContentMode {
  switch (resizeMode) {
    case 'contain':
      return 'scaleAspectFit';
    case 'cover':
      return 'scaleAspectFill';
    default:
      throw new Error(`{ resizeMode: "${resizeMode}" } is not supported for iOS platform.`);
  }
}
