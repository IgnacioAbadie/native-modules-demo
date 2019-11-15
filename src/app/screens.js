import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import Routes from '@constants/routes';
import { appScreensNavOptions, appStackNavConfig, mainSwitchNavConfig } from '@config/navigation';
import { inferRoute } from '@utils/navUtils';
import InitialLoading from '@screens/InitialLoading';
import Home from '@screens/Home';

const AppStack = createStackNavigator(
  {
    [Routes.Home]: {
      screen: Home,
      navigationOptions: appScreensNavOptions[Routes.Home]
    }
  },
  appStackNavConfig
);

export default createAppContainer(
  createAnimatedSwitchNavigator(
    {
      ...inferRoute({ InitialLoading }),
      [Routes.App]: AppStack
      // TODO: You can add for example an Onboarding flow here
      // [Routes.Onboarding]: Onboarding
    },
    mainSwitchNavConfig
  )
);
