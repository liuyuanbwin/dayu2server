module.exports = {
  dburl:'mongodb://dayu:dayu@192.168.199.153:27017/dayu',
  tokenkey:'dayukey',
  wx:{
    baseUrl:'https://api.weixin.qq.com/',
    tokenUrl:'cgi-bin/token?grant_type=client_credential',
    appid:'wx2c5bfbd966efb1e4',
    secret:'e0f112f15b3ee40367144e94c94f453c',
    ticketUrl:'cgi-bin/ticket/getticket?',
    oauthUrl:'sns/oauth2/access_token?'
  }
}