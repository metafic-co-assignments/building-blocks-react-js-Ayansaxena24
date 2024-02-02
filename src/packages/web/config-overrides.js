const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/educational-user-profile/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/mobile-account-registration/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/mobile-account-login/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/contactus/src/'),
resolveApp('../blocks/googlecalendarsync/src/'),
resolveApp('../blocks/advancedsearch/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/customform/src/'),
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/notifications/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/splashscreen/src/'),
resolveApp('../blocks/dashboard/src/'),
resolveApp('../blocks/onboardingguide/src/'),
resolveApp('../blocks/interactivefaqs/src/'),
resolveApp('../blocks/visualanalytics/src/'),
resolveApp('../blocks/landingpage/src/'),
resolveApp('../blocks/Payments/src/'),
resolveApp('../blocks/Followers/src/'),
resolveApp('../blocks/Referrals/src/'),
resolveApp('../blocks/RefundManagement/src/'),
resolveApp('../blocks/ReviewAndApproval/src/'),
resolveApp('../blocks/AdminConsole3/src/'),
resolveApp('../blocks/RolesPermissions2/src/'),
resolveApp('../blocks/DuplicateRooms2/src/'),
resolveApp('../blocks/ConnectedAccounts/src/'),
resolveApp('../blocks/EmailNotifications/src/'),
resolveApp('../blocks/Chat9/src/'),
resolveApp('../blocks/DailyTimeLimit/src/'),
resolveApp('../blocks/DeepLinking/src/'),
resolveApp('../blocks/LinkShare/src/'),
resolveApp('../blocks/PaymentAdmin2/src/'),
resolveApp('../blocks/AnonymousMode/src/'),
resolveApp('../blocks/ConversationHistory2/src/'),
resolveApp('../blocks/YourLaneTextOrLinks/src/'),
resolveApp('../blocks/ReportUser/src/'),
resolveApp('../blocks/3rdPartyAudioAndVideoIntergration/src/'),
resolveApp('../blocks/DifferentRooms/src/'),
resolveApp('../blocks/History5/src/'),
resolveApp('../blocks/PointSystemhearts/src/'),
resolveApp('../blocks/CancellationOfCall/src/'),
resolveApp('../blocks/GiveHearts/src/'),
resolveApp('../blocks/PunishmentAlerts/src/'),
resolveApp('../blocks/TabletSupport65/src/'),
resolveApp('../blocks/InvoiceBilling/src/'),
resolveApp('../blocks/QuestionBank/src/'),
resolveApp('../blocks/ProductTutorial/src/'),
resolveApp('../blocks/ContentManagement/src/'),
resolveApp('../blocks/LikeAPost/src/'),
resolveApp('../blocks/CfPayoutBankApi/src/'),
resolveApp('../blocks/CfTabletSupport7/src/'),
resolveApp('../blocks/UploadMedia2/src/'),
resolveApp('../blocks/Settings5/src/'),
resolveApp('../blocks/CfConnect4SocialMediaAccounts4/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/radar_sdk_js'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../../node_modules/react-native-password-strength-meter'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src')
]

const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    //gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    //brotli plugin
    new BrotliPlugin({ 
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  )
  config.resolve.alias = {'react-native-maps': 'react-native-web-maps', 'react-native': 'react-native-web'};
  return config
}