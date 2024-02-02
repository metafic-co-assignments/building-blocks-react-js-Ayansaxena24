import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import VisualAnalytics from "../blocks/visualanalytics/src/VisualAnalytics";
import AnonymousMode from "../blocks/AnonymousMode/src/AnonymousMode";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import QuestionBank from "../blocks/QuestionBank/src/QuestionBank";
import MobileAccountLoginBlock from "../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import AdvancedSearch from "../blocks/advancedsearch/src/AdvancedSearch";
import PunishmentAlerts from "../blocks/PunishmentAlerts/src/PunishmentAlerts";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import LikeAPost from "../blocks/LikeAPost/src/LikeAPost";
import RolesPermissions2 from "../blocks/RolesPermissions2/src/RolesPermissions2";
import Payments from "../blocks/Payments/src/Payments";
import InvoiceBilling from "../blocks/InvoiceBilling/src/InvoiceBilling";
import ConversationHistory2 from "../blocks/ConversationHistory2/src/ConversationHistory2";
import PaymentAdmin2 from "../blocks/PaymentAdmin2/src/PaymentAdmin2";
import Customform from "../blocks/customform/src/Customform";
import TabletSupport65 from "../blocks/TabletSupport65/src/TabletSupport65";
import CfPayoutBankApi from "../blocks/CfPayoutBankApi/src/CfPayoutBankApi";
import Pushnotifications from "../blocks/pushnotifications/src/Pushnotifications";
import PointSystemhearts from "../blocks/PointSystemhearts/src/PointSystemhearts";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import DeepLinking from "../blocks/DeepLinking/src/DeepLinking";
import Notifications from "../blocks/notifications/src/Notifications";
import Analytics from "../blocks/analytics/src/Analytics";
import GiveHearts from "../blocks/GiveHearts/src/GiveHearts";
import CfConnect4SocialMediaAccounts4 from "../blocks/CfConnect4SocialMediaAccounts4/src/CfConnect4SocialMediaAccounts4";
import LinkShare from "../blocks/LinkShare/src/LinkShare";
import RefundManagement from "../blocks/RefundManagement/src/RefundManagement";
import DailyTimeLimit from "../blocks/DailyTimeLimit/src/DailyTimeLimit";
import Interactivefaqs from "../blocks/interactivefaqs/src/Interactivefaqs";
import AddInteractivefaqs from "../blocks/interactivefaqs/src/AddInteractivefaqs";
import CancellationOfCall from "../blocks/CancellationOfCall/src/CancellationOfCall";
import History5 from "../blocks/History5/src/History5";
import Referrals from "../blocks/Referrals/src/Referrals";
import AdminConsole3 from "../blocks/AdminConsole3/src/AdminConsole3";
import 3rdPartyAudioAndVideoIntergration from "../blocks/3rdPartyAudioAndVideoIntergration/src/3rdPartyAudioAndVideoIntergration";
import Settings5 from "../blocks/Settings5/src/Settings5";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Categoriessubcategories from "../blocks/categoriessubcategories/src/Categoriessubcategories";
import ContentManagement from "../blocks/ContentManagement/src/ContentManagement";
import GoogleCalendarSync from "../blocks/googlecalendarsync/src/GoogleCalendarSync";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import ReviewAndApproval from "../blocks/ReviewAndApproval/src/ReviewAndApproval";
import UploadMedia2 from "../blocks/UploadMedia2/src/UploadMedia2";
import CfTabletSupport7 from "../blocks/CfTabletSupport7/src/CfTabletSupport7";
import ConnectedAccounts from "../blocks/ConnectedAccounts/src/ConnectedAccounts";
import Followers from "../blocks/Followers/src/Followers";
import PhoneNumberInput from "../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Contactus from "../blocks/contactus/src/Contactus";
import AddContactus from "../blocks/contactus/src/AddContactus";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import Chat9 from "../blocks/Chat9/src/Chat9";
import Dashboard from "../blocks/dashboard/src/Dashboard";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import ReportUser from "../blocks/ReportUser/src/ReportUser";
import Onboardingguide from "../blocks/onboardingguide/src/Onboardingguide";
import DuplicateRooms2 from "../blocks/DuplicateRooms2/src/DuplicateRooms2";
import DifferentRooms from "../blocks/DifferentRooms/src/DifferentRooms";
import LandingPage from "../blocks/landingpage/src/LandingPage";
import YourLaneTextOrLinks from "../blocks/YourLaneTextOrLinks/src/YourLaneTextOrLinks";
import ProductTutorial from "../blocks/ProductTutorial/src/ProductTutorial";
import EmailNotifications from "../blocks/EmailNotifications/src/EmailNotifications";


const HomeStack = createStackNavigator({
Home: { screen: LandingPage, navigationOptions: { header: null, title: "Home" } },
VisualAnalytics:{ screen:VisualAnalytics,navigationOptions:{ title:"VisualAnalytics"}},
AnonymousMode:{ screen:AnonymousMode,navigationOptions:{ title:"AnonymousMode"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
QuestionBank:{ screen:QuestionBank,navigationOptions:{ title:"QuestionBank"}},
MobileAccountLoginBlock:{ screen:MobileAccountLoginBlock,navigationOptions:{ title:"MobileAccountLoginBlock"}},
AdvancedSearch:{ screen:AdvancedSearch,navigationOptions:{ title:"AdvancedSearch"}},
PunishmentAlerts:{ screen:PunishmentAlerts,navigationOptions:{ title:"PunishmentAlerts"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},
LikeAPost:{ screen:LikeAPost,navigationOptions:{ title:"LikeAPost"}},
RolesPermissions2:{ screen:RolesPermissions2,navigationOptions:{ title:"RolesPermissions2"}},
Payments:{ screen:Payments,navigationOptions:{ title:"Payments"}},
InvoiceBilling:{ screen:InvoiceBilling,navigationOptions:{ title:"InvoiceBilling"}},
ConversationHistory2:{ screen:ConversationHistory2,navigationOptions:{ title:"ConversationHistory2"}},
PaymentAdmin2:{ screen:PaymentAdmin2,navigationOptions:{ title:"PaymentAdmin2"}},
Customform:{ screen:Customform,navigationOptions:{ title:"Customform"}},
TabletSupport65:{ screen:TabletSupport65,navigationOptions:{ title:"TabletSupport65"}},
CfPayoutBankApi:{ screen:CfPayoutBankApi,navigationOptions:{ title:"CfPayoutBankApi"}},
Pushnotifications:{ screen:Pushnotifications,navigationOptions:{ title:"Pushnotifications"}},
PointSystemhearts:{ screen:PointSystemhearts,navigationOptions:{ title:"PointSystemhearts"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},
DeepLinking:{ screen:DeepLinking,navigationOptions:{ title:"DeepLinking"}},
Notifications:{ screen:Notifications,navigationOptions:{ title:"Notifications"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
GiveHearts:{ screen:GiveHearts,navigationOptions:{ title:"GiveHearts"}},
CfConnect4SocialMediaAccounts4:{ screen:CfConnect4SocialMediaAccounts4,navigationOptions:{ title:"CfConnect4SocialMediaAccounts4"}},
LinkShare:{ screen:LinkShare,navigationOptions:{ title:"LinkShare"}},
RefundManagement:{ screen:RefundManagement,navigationOptions:{ title:"RefundManagement"}},
DailyTimeLimit:{ screen:DailyTimeLimit,navigationOptions:{ title:"DailyTimeLimit"}},
Interactivefaqs:{ screen:Interactivefaqs,navigationOptions:{ title:"Interactivefaqs"}},
AddInteractivefaqs:{ screen:AddInteractivefaqs,navigationOptions:{ title:"AddInteractivefaqs"}},
CancellationOfCall:{ screen:CancellationOfCall,navigationOptions:{ title:"CancellationOfCall"}},
History5:{ screen:History5,navigationOptions:{ title:"History5"}},
Referrals:{ screen:Referrals,navigationOptions:{ title:"Referrals"}},
AdminConsole3:{ screen:AdminConsole3,navigationOptions:{ title:"AdminConsole3"}},
3rdPartyAudioAndVideoIntergration:{ screen:3rdPartyAudioAndVideoIntergration,navigationOptions:{ title:"3rdPartyAudioAndVideoIntergration"}},
Settings5:{ screen:Settings5,navigationOptions:{ title:"Settings5"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
Categoriessubcategories:{ screen:Categoriessubcategories,navigationOptions:{ title:"Categoriessubcategories"}},
ContentManagement:{ screen:ContentManagement,navigationOptions:{ title:"ContentManagement"}},
GoogleCalendarSync:{ screen:GoogleCalendarSync,navigationOptions:{ title:"GoogleCalendarSync"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
ReviewAndApproval:{ screen:ReviewAndApproval,navigationOptions:{ title:"ReviewAndApproval"}},
UploadMedia2:{ screen:UploadMedia2,navigationOptions:{ title:"UploadMedia2"}},
CfTabletSupport7:{ screen:CfTabletSupport7,navigationOptions:{ title:"CfTabletSupport7"}},
ConnectedAccounts:{ screen:ConnectedAccounts,navigationOptions:{ title:"ConnectedAccounts"}},
Followers:{ screen:Followers,navigationOptions:{ title:"Followers"}},
PhoneNumberInput:{ screen:PhoneNumberInput,navigationOptions:{ title:"PhoneNumberInput"}},
AdditionalDetailForm:{ screen:AdditionalDetailForm,navigationOptions:{ title:"AdditionalDetailForm"}},
Contactus:{ screen:Contactus,navigationOptions:{ title:"Contactus"}},
AddContactus:{ screen:AddContactus,navigationOptions:{ title:"AddContactus"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
Chat9:{ screen:Chat9,navigationOptions:{ title:"Chat9"}},
Dashboard:{ screen:Dashboard,navigationOptions:{ title:"Dashboard"}},
Splashscreen:{ screen:Splashscreen,navigationOptions:{ title:"Splashscreen"}},
ReportUser:{ screen:ReportUser,navigationOptions:{ title:"ReportUser"}},
Onboardingguide:{ screen:Onboardingguide,navigationOptions:{ title:"Onboardingguide"}},
DuplicateRooms2:{ screen:DuplicateRooms2,navigationOptions:{ title:"DuplicateRooms2"}},
DifferentRooms:{ screen:DifferentRooms,navigationOptions:{ title:"DifferentRooms"}},
LandingPage:{ screen:LandingPage,navigationOptions:{ title:"LandingPage"}},
YourLaneTextOrLinks:{ screen:YourLaneTextOrLinks,navigationOptions:{ title:"YourLaneTextOrLinks"}},
ProductTutorial:{ screen:ProductTutorial,navigationOptions:{ title:"ProductTutorial"}},
EmailNotifications:{ screen:EmailNotifications,navigationOptions:{ title:"EmailNotifications"}},

  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack />
  );
};
