
import NewService from '../core/apisService';

class AccountService extends NewService {
  constructor(props = {}) {
    super(props);
  }

  actSignin = ({ userName, password }) => {
    console.log('username', userName);
    return this.post(this.apiUlr() + '/api/accounts/user-login', {
      userName,
      password,
    });
  };
  actManagerSignin = ({ userName, password }) => {
    // console.log('username', username);
    return this.post(this.apiUlr() + '/api/accounts/manager-login', {
      userName,
      password,
    });
  };

}

export default AccountService;
