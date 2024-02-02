// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
import firebase from 'firebase'
import { connect } from 'react-firebase'

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import VisualAnalytics from "../../blocks/visualanalytics/src/VisualAnalytics";
import AnonymousMode from "../../blocks/AnonymousMode/src/AnonymousMode";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import QuestionBank from "../../blocks/QuestionBank/src/QuestionBank";
import MobileAccountLoginBlock from "../../blocks/mobile-account-login/src/MobileAccountLoginBlock";
import AdvancedSearch from "../../blocks/advancedsearch/src/AdvancedSearch";
import PunishmentAlerts from "../../blocks/PunishmentAlerts/src/PunishmentAlerts";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import LikeAPost from "../../blocks/LikeAPost/src/LikeAPost";
import RolesPermissions2 from "../../blocks/RolesPermissions2/src/RolesPermissions2";
import Payments from "../../blocks/Payments/src/Payments";
import InvoiceBilling from "../../blocks/InvoiceBilling/src/InvoiceBilling";
import ConversationHistory2 from "../../blocks/ConversationHistory2/src/ConversationHistory2";
import PaymentAdmin2 from "../../blocks/PaymentAdmin2/src/PaymentAdmin2";
import Customform from "../../blocks/customform/src/Customform";
import TabletSupport65 from "../../blocks/TabletSupport65/src/TabletSupport65";
import CfPayoutBankApi from "../../blocks/CfPayoutBankApi/src/CfPayoutBankApi";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import PointSystemhearts from "../../blocks/PointSystemhearts/src/PointSystemhearts";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import DeepLinking from "../../blocks/DeepLinking/src/DeepLinking";
import Notifications from "../../blocks/notifications/src/Notifications";
import Analytics from "../../blocks/analytics/src/Analytics";
import GiveHearts from "../../blocks/GiveHearts/src/GiveHearts";
import CfConnect4SocialMediaAccounts4 from "../../blocks/CfConnect4SocialMediaAccounts4/src/CfConnect4SocialMediaAccounts4";
import LinkShare from "../../blocks/LinkShare/src/LinkShare";
import RefundManagement from "../../blocks/RefundManagement/src/RefundManagement";
import DailyTimeLimit from "../../blocks/DailyTimeLimit/src/DailyTimeLimit";
import Interactivefaqs from "../../blocks/interactivefaqs/src/Interactivefaqs";
import AddInteractivefaqs from "../../blocks/interactivefaqs/src/AddInteractivefaqs";
import CancellationOfCall from "../../blocks/CancellationOfCall/src/CancellationOfCall";
import History5 from "../../blocks/History5/src/History5";
import Referrals from "../../blocks/Referrals/src/Referrals";
import AdminConsole3 from "../../blocks/AdminConsole3/src/AdminConsole3";
import 3rdPartyAudioAndVideoIntergration from "../../blocks/3rdPartyAudioAndVideoIntergration/src/3rdPartyAudioAndVideoIntergration";
import Settings5 from "../../blocks/Settings5/src/Settings5";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Categoriessubcategories from "../../blocks/categoriessubcategories/src/Categoriessubcategories";
import ContentManagement from "../../blocks/ContentManagement/src/ContentManagement";
import GoogleCalendarSync from "../../blocks/googlecalendarsync/src/GoogleCalendarSync";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import ReviewAndApproval from "../../blocks/ReviewAndApproval/src/ReviewAndApproval";
import UploadMedia2 from "../../blocks/UploadMedia2/src/UploadMedia2";
import CfTabletSupport7 from "../../blocks/CfTabletSupport7/src/CfTabletSupport7";
import ConnectedAccounts from "../../blocks/ConnectedAccounts/src/ConnectedAccounts";
import Followers from "../../blocks/Followers/src/Followers";
import PhoneNumberInput from "../../blocks/mobile-account-registration/src/PhoneNumberInput";
import AdditionalDetailForm from "../../blocks/mobile-account-registration/src/AdditionalDetailForm";
import Contactus from "../../blocks/contactus/src/Contactus";
import AddContactus from "../../blocks/contactus/src/AddContactus";
import EducationalUserProfile from "../../blocks/educational-user-profile/src/EducationalUserProfile";
import Chat9 from "../../blocks/Chat9/src/Chat9";
import Dashboard from "../../blocks/dashboard/src/Dashboard";
import Splashscreen from "../../blocks/splashscreen/src/Splashscreen";
import ReportUser from "../../blocks/ReportUser/src/ReportUser";
import Onboardingguide from "../../blocks/onboardingguide/src/Onboardingguide";
import DuplicateRooms2 from "../../blocks/DuplicateRooms2/src/DuplicateRooms2";
import DifferentRooms from "../../blocks/DifferentRooms/src/DifferentRooms";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import YourLaneTextOrLinks from "../../blocks/YourLaneTextOrLinks/src/YourLaneTextOrLinks";
import ProductTutorial from "../../blocks/ProductTutorial/src/ProductTutorial";
import EmailNotifications from "../../blocks/EmailNotifications/src/EmailNotifications";



const routeMap = {
VisualAnalytics:{
 component:VisualAnalytics,
path:"/VisualAnalytics"},
AnonymousMode:{
 component:AnonymousMode,
path:"/AnonymousMode"},
SocialMediaAccountLoginScreen:{
 component:SocialMediaAccountLoginScreen,
path:"/SocialMediaAccountLoginScreen"},
QuestionBank:{
 component:QuestionBank,
path:"/QuestionBank"},
MobileAccountLoginBlock:{
 component:MobileAccountLoginBlock,
path:"/MobileAccountLoginBlock"},
AdvancedSearch:{
 component:AdvancedSearch,
path:"/AdvancedSearch"},
PunishmentAlerts:{
 component:PunishmentAlerts,
path:"/PunishmentAlerts"},
OTPInputAuth:{
 component:OTPInputAuth,
path:"/OTPInputAuth"},
LikeAPost:{
 component:LikeAPost,
path:"/LikeAPost"},
RolesPermissions2:{
 component:RolesPermissions2,
path:"/RolesPermissions2"},
Payments:{
 component:Payments,
path:"/Payments"},
InvoiceBilling:{
 component:InvoiceBilling,
path:"/InvoiceBilling"},
ConversationHistory2:{
 component:ConversationHistory2,
path:"/ConversationHistory2"},
PaymentAdmin2:{
 component:PaymentAdmin2,
path:"/PaymentAdmin2"},
Customform:{
 component:Customform,
path:"/Customform"},
TabletSupport65:{
 component:TabletSupport65,
path:"/TabletSupport65"},
CfPayoutBankApi:{
 component:CfPayoutBankApi,
path:"/CfPayoutBankApi"},
Pushnotifications:{
 component:Pushnotifications,
path:"/Pushnotifications"},
PointSystemhearts:{
 component:PointSystemhearts,
path:"/PointSystemhearts"},
ForgotPassword:{
 component:ForgotPassword,
path:"/ForgotPassword"},
ForgotPasswordOTP:{
 component:ForgotPasswordOTP,
path:"/ForgotPasswordOTP"},
NewPassword:{
 component:NewPassword,
path:"/NewPassword"},
DeepLinking:{
 component:DeepLinking,
path:"/DeepLinking"},
Notifications:{
 component:Notifications,
path:"/Notifications"},
Analytics:{
 component:Analytics,
path:"/Analytics"},
GiveHearts:{
 component:GiveHearts,
path:"/GiveHearts"},
CfConnect4SocialMediaAccounts4:{
 component:CfConnect4SocialMediaAccounts4,
path:"/CfConnect4SocialMediaAccounts4"},
LinkShare:{
 component:LinkShare,
path:"/LinkShare"},
RefundManagement:{
 component:RefundManagement,
path:"/RefundManagement"},
DailyTimeLimit:{
 component:DailyTimeLimit,
path:"/DailyTimeLimit"},
Interactivefaqs:{
 component:Interactivefaqs,
path:"/Interactivefaqs"},
AddInteractivefaqs:{
 component:AddInteractivefaqs,
path:"/AddInteractivefaqs"},
CancellationOfCall:{
 component:CancellationOfCall,
path:"/CancellationOfCall"},
History5:{
 component:History5,
path:"/History5"},
Referrals:{
 component:Referrals,
path:"/Referrals"},
AdminConsole3:{
 component:AdminConsole3,
path:"/AdminConsole3"},
3rdPartyAudioAndVideoIntergration:{
 component:3rdPartyAudioAndVideoIntergration,
path:"/3rdPartyAudioAndVideoIntergration"},
Settings5:{
 component:Settings5,
path:"/Settings5"},
UserProfileBasicBlock:{
 component:UserProfileBasicBlock,
path:"/UserProfileBasicBlock"},
Categoriessubcategories:{
 component:Categoriessubcategories,
path:"/Categoriessubcategories"},
ContentManagement:{
 component:ContentManagement,
path:"/ContentManagement"},
GoogleCalendarSync:{
 component:GoogleCalendarSync,
path:"/GoogleCalendarSync"},
CountryCodeSelector:{
 component:CountryCodeSelector,
path:"/CountryCodeSelector"},
ReviewAndApproval:{
 component:ReviewAndApproval,
path:"/ReviewAndApproval"},
UploadMedia2:{
 component:UploadMedia2,
path:"/UploadMedia2"},
CfTabletSupport7:{
 component:CfTabletSupport7,
path:"/CfTabletSupport7"},
ConnectedAccounts:{
 component:ConnectedAccounts,
path:"/ConnectedAccounts"},
Followers:{
 component:Followers,
path:"/Followers"},
PhoneNumberInput:{
 component:PhoneNumberInput,
path:"/PhoneNumberInput"},
AdditionalDetailForm:{
 component:AdditionalDetailForm,
path:"/AdditionalDetailForm"},
Contactus:{
 component:Contactus,
path:"/Contactus"},
AddContactus:{
 component:AddContactus,
path:"/AddContactus"},
EducationalUserProfile:{
 component:EducationalUserProfile,
path:"/EducationalUserProfile"},
Chat9:{
 component:Chat9,
path:"/Chat9"},
Dashboard:{
 component:Dashboard,
path:"/Dashboard"},
Splashscreen:{
 component:Splashscreen,
path:"/Splashscreen"},
ReportUser:{
 component:ReportUser,
path:"/ReportUser"},
Onboardingguide:{
 component:Onboardingguide,
path:"/Onboardingguide"},
DuplicateRooms2:{
 component:DuplicateRooms2,
path:"/DuplicateRooms2"},
DifferentRooms:{
 component:DifferentRooms,
path:"/DifferentRooms"},
LandingPage:{
 component:LandingPage,
path:"/LandingPage"},
YourLaneTextOrLinks:{
 component:YourLaneTextOrLinks,
path:"/YourLaneTextOrLinks"},
ProductTutorial:{
 component:ProductTutorial,
path:"/ProductTutorial"},
EmailNotifications:{
 component:EmailNotifications,
path:"/EmailNotifications"},

  Home: {
component:LandingPage,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  }

};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});

class App extends Component {
   
  render() {

    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');
    
    return (
      <View style={{ height: '100vh', width: '100vw' }}>
        <TopNav />
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}

export default App;
