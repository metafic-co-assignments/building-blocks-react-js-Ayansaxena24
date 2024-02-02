/* App/Lib/GeneralHelpers.js */
import { Platform , StyleSheet} from 'react-native';
import { COLORS } from '../../framework/src/Globals'
import { heightFromPercentage } from '../../framework/src/Utilities';
//@ts-ignore
import i18n from "i18n-js";
//@ts-ignore
import * as RNLocalize from "react-native-localize";

export const CommonStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  headerContainer:{
    backgroundColor:COLORS.yellow,
    height: '10%',
  },
  authHeader:{
    height: heightFromPercentage(10),
    backgroundColor: COLORS.yellow
  },
  authHeaderWhite:{
    height: heightFromPercentage(10),
    backgroundColor: COLORS.white
  },
  formContainer: {
    width: "80%"
  },
  textAlignCenter:{
    textAlign: 'center'
  },
  labelTextStyle: {
    //fontSize: 16,
    color: COLORS.inputLabel
  },
  error: {
    color: COLORS.red,
    fontSize: 14
  },
  scrollStyle: {
    width: "100%"
  },
  btnTitleStyle:{
    fontSize: 17,
    color: COLORS.black
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center"
  },
  shadowStyle: {
    shadowOffset:
      Platform.OS === "ios"
        ? { width: 0, height: 1 }
        : { width: 0, height: 2 },
    shadowColor: COLORS.inputLabel,
    shadowOpacity: 0.9,
    shadowRadius: Platform.OS === "ios" ? 3 : 5,
    elevation: 5
  },
  boxShadowStyle: {
    backgroundColor: COLORS.white,
    marginHorizontal:2,
    marginVertical:1,
    shadowOffset:
    Platform.OS === "ios"
      ? { width: 0, height: 1 }
      : { width: 0, height: 2 },
    shadowColor: COLORS.inputLabel,
    shadowOpacity: 0.9,
    shadowRadius: Platform.OS === "ios" ? 1 : 5,
    elevation: 2,    
    borderRadius:8,
  },
  toastModal: {
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: '12%',
    paddingVertical: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  clearModal: {
    borderRadius: 5,
    marginHorizontal: 50,
    height: 220,
    backgroundColor: COLORS.red
  },
  imageThumb: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  },
  flexContainer: {
    flex: 1,
    width: "100%"
  },
  rowStyle: {
    flexDirection: "row"
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  flexEnd: {
    justifyContent: "flex-end"
  },
  jCCenter: {
    justifyContent: "center"
  },
  spaceBetween: {
    justifyContent: "space-between",    
  },
  alignItemsCenter:{
    alignItems: "center"
  },
  styleCenter: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  centerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  width100P:{
    width: '100%'
  },
  subView: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  emptyList: {
    alignItems: "center",
    marginTop: 100
  },
  emptyListFilter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  },
  backIconView: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 30,
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  crossImage: {
    tintColor: COLORS.red,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  searchTextInput: {
    width: "80%"
  },
  errorReport: {
    width: "70%",
    color: COLORS.red,
    fontSize: 15,
    marginLeft: "28.8%"
  }
});

/** 
 * Language Helper Section
 * */
const en = {
  "AccountInformation": "Account Information",
  "Addacard": "Add a card",
  "ADDONS": "ADDONS",
  "AgreeTermsConditions": "I Agree to Terms & Conditions",
  "AllSpeicalists": "All Speicalists",
  "Appversion": "App version",
  "Apply": "Apply",
  "Available": "Available",
  "AvailableSlot": "Available Slot",
  "BestSpecialists": "Best Specialists",
  "BookAppointment": "Book Appointment",
  "BookMoreAppointment": "Book more Appointment",
  "BookNow": "Book now",
  "CardNotAdded": "Card not added.",
  "Close": "Close",
  "ConfirmPassword": "Confirm Password",
  "ConfirmnewPassword": "Confirm new Password",
  "ConfirmOtp": "Confirm Otp",
  "ConfirmOtpMsg": "We just sent a 4 digits OTP to email. Enter your OTP code below.",
  "ConfirmPayment": "Confirm Payment",
  "Congratulations": "Congratulation!",
  "Contacts": "Contacts",
  "Continue": "Continue",
  "Copy": "Copy",
  "CreateNewAccount": "Create new Account",
  "DateNTime": "Date & Time",
  "DateOfBirth": "Date of Birth",
  "Directions": "Directions",
  "Discount": "Discount",
  "Edit": "Edit",
  "Email": "Email",
  "EnterConfirmText": "Enter your new password and confirm it.",
  "Facebook": "Facebook",
  "Facial": "Facial",
  "FetchingCards": "Fetching cards..",
  "FINISH": "FINISH",
  "Finished": "Finished",
  "ForgotPassword": "Forgot Password",
  "ForgotPasswordQ": "Forgot Password?",
  "From": "From",
  "FullName": "Full Name",
  "GetStarted": "Get Started",
  "GoToAppointment": "Go to Appointment",
  "Hair": "Hair",
  "Haircuts": "Haircuts",
  "HairStylist": "Hair Stylist",
  "Hi": "Hi",
  "History": "History",
  "Information": "Information",
  "Instagram": "Instagram",
  "InviteFriends": "Invite Friends",
  "InviteCodeText": "Please share the code below for your friends to join the HASA.",
  "Location": "Location",
  "LOCATION": "LOCATION",
  "Loading": "Loading..",
  "LoadingServices": "Loading services..",
  "LogOut": "Log Out",
  "MakeupArtist": "Makeup Artist",
  "Message": "Message",
  "Mobile": "Mobile",
  "MobileNumber": "Mobile Number",
  "MobileSalonNearYou": "Mobile Salon Near You",
  "MyBookings": "My Bookings",
  "NewPassword": "New Password",
  "Nails": "Nails",
  "Next": "Next",
  "NoAppointment": "No appointments.",
  "NoAppointmentForDay": "No appointments on this day.",
  "NoAppointmentHistory": "No appointment history.",
  "NoReviews": "No Reviews yet.",
  "NoServiceFound": "No service found.",
  "NOTED": "NOTED",
  "NotifyAdmin": "Notify Admin",
  "OfferHasExpired": "Offer has expired.",
  "Ongoing": "Ongoing",
  "Otp": "Otp",
  "OurShayvers": "Our Shayvers",
  "Password": "Password",
  "Paidamount": "Paid amount",
  "Payment": "Payment",
  "PAYMENTDETAILS": "PAYMENT DETAILS",
  "PaymentMethods": "Payment Methods",
  "Pickupat": "Pick up at",
  "PromoCode": "Promo code",
  "PromotionsAndOffers": "Promotions & Offers",
  "ReadLess": "Read less",
  "ReadMore": "Read more",  
  "RecoverText": "Please enter your Email so we can help you recover your password.",
  "Resend": "Resend",
  "Remind": "Remind me 1h in advance",
  "ResetPassword": "Reset Password",
  "ResetSuccessMsg": "Your password has been completely reset, login and use the app.",
  "Review": "Review",
  "ReviewQuestion1": "What are you feel about this salon?",
  "Save": "Save",
  "Schedule": "Schedule",
  "Scheduleforlater": "Schedule for later",
  "Send": "Send",
  "Services": "Services",
  "SERVICES": "SERVICES",
  "ServicesIncluded": "Services Included",
  "Settings": "Settings",  
  "SignIn": "Sign In",
  "SigninPrefix": "You have an account?  ",
  "SignUp": "Sign Up",
  "SignupPrefix": "You don't have an account?  ",
  "Skip": "Skip",
  "Specialities": "Specialities",
  "SpecialOffers": "Special Offers",
  "SrBarber": "Sr. Barber",
  "START": "START",
  "STATUS": "STATUS",
  "Styles": "Styles",
  "SwiperOne": "Book one of our mobile salons and have it come to you anywhere.",
  "SwiperOneTitle": "It is Smart! ... It is Mobile!",
  "SwiperTwo": "Save time and skip queues. You choose when and where.",
  "SwiperTwoTitle": "It is Easy! ... It is Convenient!",
  "SwiperThree": "Book your first mobile salon experience now!",
  "SwiperThreeTitle": "Yalla Shayv!",
  "TermsOfServices": "Terms of services",
  "TimeOfEvent": "Time of Event",
  "Title": "Title",
  "To": "To",
  "Totalamount": "Total amount",
  "Twitter": "Twitter",
  "TotalPay": "Total Pay",
  "Unavailable": "Unavailable",  
  "Verification": "Verification",
  "VerificationMsg": "Click the verification link we just sent to \n your email address.",
  "VerificationLinkNotRecMsg": "Didn't receive the email in your inbox?  ",
  "VerificationSuccessMsg": "Your email address has been verified successfully, login and use the app",
  "View": "View",
  "Whatwouldyouliketodo": "What would you like to do?",
  "YourAddress": "Your Address",
  "YourReview": "Your Review",
};

i18n.fallbacks = true;
i18n.translations = { en };

const fallback = { languageTag: "en", isRTL: false };

const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback;
i18n.locale = languageTag;

export default i18n;
/** Language Helper Section Ends*/