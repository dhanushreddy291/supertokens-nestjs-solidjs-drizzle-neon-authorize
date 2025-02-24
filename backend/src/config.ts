import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';

export const appInfo = {
  // Learn more about this on https://supertokens.com/docs/thirdpartypasswordless/appInfo
  appName: 'ST',
  apiDomain: 'http://localhost:3001',
  websiteDomain: 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri = process.env.SUPERTOKENS_URI;
export const apiKey = process.env.SUPERTOKENS_API_KEY;

export const recipeList = [
  ThirdParty.init({
    signInAndUpFeature: {
    },
  }),
  Session.init(),
  Dashboard.init(),
  UserRoles.init(),
];
