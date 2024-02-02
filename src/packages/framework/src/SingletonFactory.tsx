import RestClientBlock from './Blocks/RestApiClientBlock';
import SessionManagerBlock from './Blocks/SessionManagerBlock';
import UserAccountManagerBlock from './Blocks/UserAccountManagerBlock';
import AuthManagerBlock from './Blocks/AuthManagerBlock';

var SingletonFactory = (function() {
  let restBlockInstance: any;
  let sessionManagerInstance: any;
  let userManagerInstance: any;
  let authManagerInstance: any;

  return {
    getRestBlockInstance: function() {
      if (!restBlockInstance) {
        restBlockInstance = RestClientBlock.getInstance();
        // Hide the constructor so the returned object can't be new'd...
        restBlockInstance.constructor = null;
      }
      return restBlockInstance;
    },
    getSessionBlockInstance: function() {
      if (!sessionManagerInstance) {
        sessionManagerInstance = SessionManagerBlock.getInstance();
        // Hide the constructor so the returned object can't be new'd...
        sessionManagerInstance.constructor = null;
      }
      return sessionManagerInstance;
    },

    getUserManagerInstance: function() {
      if (!userManagerInstance) {
        userManagerInstance = UserAccountManagerBlock.getInstance();
        // Hide the constructor so the returned object can't be new'd...
        userManagerInstance.constructor = null;
      }
      return userManagerInstance;
    },

    getAuthManagerInstance: function() {
      if (!authManagerInstance) {
        authManagerInstance = AuthManagerBlock.getInstance();
        // Hide the constructor so the returned object can't be new'd...
        authManagerInstance.constructor = null;
      }
      return authManagerInstance;
    },
  };
})();

export default SingletonFactory;
