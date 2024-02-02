import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import MobilePhoneLogInAdapter from "../../blocks/adapters/src/MobilePhoneLogInAdapter";
import MobilePhoneToAdditionalDetailsAdapter from "../../blocks/adapters/src/MobilePhoneToAdditionalDetailsAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import OnboardingAdapter from "../../blocks/adapters/src/OnboardingAdapter";

//Assembler generated adapters start
const mobilePhoneLogInAdapter = new MobilePhoneLogInAdapter();
const mobilePhoneToAdditionalDetailsAdapter = new MobilePhoneToAdditionalDetailsAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const onboardingAdapter = new OnboardingAdapter();

//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to YLanes1!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'EducationalUserProfile'}  onPress={() => navigation.navigate("EducationalUserProfile")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'PhoneNumberInput'}  onPress={() => navigation.navigate("PhoneNumberInput")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'MobileAccountLoginBlock'}  onPress={() => navigation.navigate("MobileAccountLoginBlock")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'Contactus'}  onPress={() => navigation.navigate("Contactus")} />
<CustomTextItem content={'GoogleCalendarSync'}  onPress={() => navigation.navigate("GoogleCalendarSync")} />
<CustomTextItem content={'AdvancedSearch'}  onPress={() => navigation.navigate("AdvancedSearch")} />
<CustomTextItem content={'Categoriessubcategories'}  onPress={() => navigation.navigate("Categoriessubcategories")} />
<CustomTextItem content={'Customform'}  onPress={() => navigation.navigate("Customform")} />
<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'Splashscreen'}  onPress={() => navigation.navigate("Splashscreen")} />
<CustomTextItem content={'Dashboard'}  onPress={() => navigation.navigate("Dashboard")} />
<CustomTextItem content={'Onboardingguide'}  onPress={() => navigation.navigate("Onboardingguide")} />
<CustomTextItem content={'Interactivefaqs'}  onPress={() => navigation.navigate("Interactivefaqs")} />
<CustomTextItem content={'VisualAnalytics'}  onPress={() => navigation.navigate("VisualAnalytics")} />
<CustomTextItem content={'LandingPage'}  onPress={() => navigation.navigate("LandingPage")} />
<CustomTextItem content={'Payments'}  onPress={() => navigation.navigate("Payments")} />
<CustomTextItem content={'Followers'}  onPress={() => navigation.navigate("Followers")} />
<CustomTextItem content={'Referrals'}  onPress={() => navigation.navigate("Referrals")} />
<CustomTextItem content={'RefundManagement'}  onPress={() => navigation.navigate("RefundManagement")} />
<CustomTextItem content={'ReviewAndApproval'}  onPress={() => navigation.navigate("ReviewAndApproval")} />
<CustomTextItem content={'AdminConsole3'}  onPress={() => navigation.navigate("AdminConsole3")} />
<CustomTextItem content={'RolesPermissions2'}  onPress={() => navigation.navigate("RolesPermissions2")} />
<CustomTextItem content={'DuplicateRooms2'}  onPress={() => navigation.navigate("DuplicateRooms2")} />
<CustomTextItem content={'ConnectedAccounts'}  onPress={() => navigation.navigate("ConnectedAccounts")} />
<CustomTextItem content={'EmailNotifications'}  onPress={() => navigation.navigate("EmailNotifications")} />
<CustomTextItem content={'Chat9'}  onPress={() => navigation.navigate("Chat9")} />
<CustomTextItem content={'DailyTimeLimit'}  onPress={() => navigation.navigate("DailyTimeLimit")} />
<CustomTextItem content={'DeepLinking'}  onPress={() => navigation.navigate("DeepLinking")} />
<CustomTextItem content={'LinkShare'}  onPress={() => navigation.navigate("LinkShare")} />
<CustomTextItem content={'PaymentAdmin2'}  onPress={() => navigation.navigate("PaymentAdmin2")} />
<CustomTextItem content={'AnonymousMode'}  onPress={() => navigation.navigate("AnonymousMode")} />
<CustomTextItem content={'ConversationHistory2'}  onPress={() => navigation.navigate("ConversationHistory2")} />
<CustomTextItem content={'YourLaneTextOrLinks'}  onPress={() => navigation.navigate("YourLaneTextOrLinks")} />
<CustomTextItem content={'ReportUser'}  onPress={() => navigation.navigate("ReportUser")} />
<CustomTextItem content={'3rdPartyAudioAndVideoIntergration'}  onPress={() => navigation.navigate("3rdPartyAudioAndVideoIntergration")} />
<CustomTextItem content={'DifferentRooms'}  onPress={() => navigation.navigate("DifferentRooms")} />
<CustomTextItem content={'History5'}  onPress={() => navigation.navigate("History5")} />
<CustomTextItem content={'PointSystemhearts'}  onPress={() => navigation.navigate("PointSystemhearts")} />
<CustomTextItem content={'CancellationOfCall'}  onPress={() => navigation.navigate("CancellationOfCall")} />
<CustomTextItem content={'GiveHearts'}  onPress={() => navigation.navigate("GiveHearts")} />
<CustomTextItem content={'PunishmentAlerts'}  onPress={() => navigation.navigate("PunishmentAlerts")} />
<CustomTextItem content={'TabletSupport65'}  onPress={() => navigation.navigate("TabletSupport65")} />
<CustomTextItem content={'InvoiceBilling'}  onPress={() => navigation.navigate("InvoiceBilling")} />
<CustomTextItem content={'QuestionBank'}  onPress={() => navigation.navigate("QuestionBank")} />
<CustomTextItem content={'ProductTutorial'}  onPress={() => navigation.navigate("ProductTutorial")} />
<CustomTextItem content={'ContentManagement'}  onPress={() => navigation.navigate("ContentManagement")} />
<CustomTextItem content={'LikeAPost'}  onPress={() => navigation.navigate("LikeAPost")} />
<CustomTextItem content={'CfPayoutBankApi'}  onPress={() => navigation.navigate("CfPayoutBankApi")} />
<CustomTextItem content={'CfTabletSupport7'}  onPress={() => navigation.navigate("CfTabletSupport7")} />
<CustomTextItem content={'UploadMedia2'}  onPress={() => navigation.navigate("UploadMedia2")} />
<CustomTextItem content={'Settings5'}  onPress={() => navigation.navigate("Settings5")} />
<CustomTextItem content={'CfConnect4SocialMediaAccounts4'}  onPress={() => navigation.navigate("CfConnect4SocialMediaAccounts4")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;