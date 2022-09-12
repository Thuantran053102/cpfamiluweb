//const Url = 'https://webservice.cp.com.vn/MyAsset/api/';

// lưu các chuỗi đừng dẫn

const Url = 'http://172.21.1.99/WebServiceCPMyAssets/api/';

const ApiGetList = 'get-list';
const ApiGetListAssets = 'get-list-assets';
const ApiGetListInsertUpdateAssets = 'get-list-insert-update-assets';
const ApiInsUpdateDel = 'ins-update-del';
const ApiGetToken = 'get-token';

const ApiGetListPaging = 'get-list-paging';

const ApiLogin = 'login';
const ApiInsUserTest = 'ins-user-test';

const ApiInsHeaderDetailConfirmRequest = 'ins-header-detail-confirm-request'
const ApiInsHeaderDetailCheckRequest = 'ins-header-detail-check-request'

const ApiGetListCheckRequestDtl = 'get-list-request-check-dtl'


const ApiSendMailSubHeader = 'send-mail-sub-header'
const ApiSendMailSubHeaderInfo = 'api/send-mail-sub-header-info'



const ApiLoginDomain = 'get-token-center'
const ApiGetListPrivate='get-list-private'

let DataBaseName = "0x02000000D505990DD8B558F00E1D1155C043F2097810A8F545AAD8E44A06E422B6D2F182";
let SchemaName = "CPV01SQL";

const UrlTemplateAsset = 'https://cpvn.sharepoint.com/:x:/g/IT-CENTER/EYociIZaPyhFs623ZS5OJF8BujBt7xQNWm_N-KwbYcWs1A?e=qhlB8b';
const UrlTemplateCompany = 'https://cpvn.sharepoint.com/:x:/g/IT-CENTER/ETWnLio0vwlOpdoyXvYx5T8BTqJN2i9J-TUw5wk-e1awdQ?e=qvxO39';
const UrlTemplateBA = 'https://cpvn.sharepoint.com/:x:/g/IT-CENTER/EbRcLHb3JJdCr0FO7fxXkMEBPkZL-78Y3rBv2mpYCMwgGA?e=0Nld4H';
const UrlTemplatePCA = 'https://cpvn.sharepoint.com/:x:/g/IT-CENTER/ETir47dB9P5Co5NkgAshTy0BHR8b649mshEUEN6pE7FiqQ?e=yxzgch';
const UrlTemplateCCA = 'https://cpvn.sharepoint.com/:x:/g/IT-CENTER/EUGxbXdxgKxGsMibhcSSSXIBys9lxPMQ9kblVIrDx-NGZQ?e=OJja3c';


//P2
const ApiInsProjectInfo = 'ins-project-info'

export { Url, ApiGetList, ApiGetListAssets, ApiGetListInsertUpdateAssets, ApiInsUpdateDel, ApiGetToken, ApiLogin, ApiGetListPaging, ApiInsUserTest, ApiInsHeaderDetailConfirmRequest
, ApiInsHeaderDetailCheckRequest, ApiLoginDomain, ApiGetListPrivate, DataBaseName, SchemaName
, UrlTemplateAsset, UrlTemplateCompany, UrlTemplateBA, UrlTemplatePCA, UrlTemplateCCA, ApiSendMailSubHeader
, ApiGetListCheckRequestDtl, ApiSendMailSubHeaderInfo
, ApiInsProjectInfo}
