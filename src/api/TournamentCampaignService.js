import NewService from '../core/apisService';

class CampaignService extends NewService {
  actCreateCampaign = (params) => {
    return this.post(this.apiUlr() + '/api/tournament-campaign', params);
  };
  actGetCampaign = (params) => {
    return this.get(this.apiUlr() + '/api/tournament-campaign/paging', params);
  };
 
}
export default CampaignService;
