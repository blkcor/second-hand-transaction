const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default
const alipaySdk = new AlipaySdk({
  appId: '2021000122683382', // 应用id
  gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关
  signType: 'RSA2', // 编码格式
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw9NbhlLiDjNgRZDwXRgKryyZSu2jE8Weu3f+BzP50qdl1yBpQQu1kgcxAnyN4YEr742ZsJ/1EKy4tOZls1Dy6x3yYIsVSzf6iJyqI+MKZ1XBZ4t8DW5FOJlfNLLfbh6QNb31K+7fh2A4JvQ+J/hX0yz8GafieZdO0U1ehl5HylgtWdg7VCANr255RjDGpzwQP1lffqFkKuIF5zT5G56sPMox1KSXVI7nx4dmLk3LooJPh5E6oQ7r4Ah6c/v7h2ONAqnxb1QNL8npK9nUL2HAEWd1xiaIE5cmddyCRdfjttcgoMtikHhVs0iAFSRO75JQ6eqU14NAMdrp5GT+PpXdjwIDAQAB', // 支付宝公钥
  privateKey: 'MIIEpAIBAAKCAQEAtg22MW1c7ez2J9X7EEKnAdy3JpvQSUpEPY0pY7ISfHoCmlhzesPqI38/QjUxXMN3bIeCzatEy7rk6Ty5jFePfO9vH0cCTHmtvJsLxzlEHctwCjBu95exYycEeVr8sYYJR95ej+O5gvWt9Dc0W2pfLcsYpQ/MzQCC7228n1gp5/gBajwjyU1phROAiIWiSBLe86b+d9MbGlnXJYrLidV+DaqjjzGvURiXrqkuHqihwfldzURAv5M/w5nxEUJj773c7iNTpwEVqWK+eheEDntA3n1nWYo1xIrvS1aKTKNu+CJQfqjdqDlmiaWbW3xcD81ZR7so95LiBdvk0gxA0rZusQIDAQABAoIBAQCK+LSXzpAd38GYbzQUGY07Uq1M/6xkBhlJkzSBMjICa3EJOXQNxvg42K4FcG2aDmxfoKItNgxyKN0NXpmVlFGoYW5GRgJvNoN1cjXvgruIsv94B7jtsBJtSh+UM+yp51O2VP2CgaffXIPJ5UpGblDxuBO8DO+dnkJVW0Odr8Ntmwtipi6V7BwC67oSOcu8SKG4JbijVVRg05naBEUMwPvAvExZkAvE98UXKt0BG2EcxWO+mIaH1EJuzVKKqLwjKpnVShGb1xOgY1wgIw4mtCqJfe+YwnTC+ZzT4yjnl2cqKIny2pwKRqLUnf7LVUnr3zw8eV+jivLhoyYclu66vnABAoGBAPewLXy4YjgPDvtgL6Sdf7qb7UmPYYVa3Fl7PsMUSpRA7TGcJjOtCXMTM7TV7oZFkzP6uBcKxtl8DRh5EfBUQgw48ZgyQ+/oOIHsS4o1E5xBH+DQJiIHiCyIaJjo09vjItma5QV66j9guhoXkdjmy/trd30ByaGHysnciVVt7frBAoGBALwpr0NNSYCY6vhn6W+qWQWDWMN/JLohSfp0IFujVz+DYWm7Y41hw5AIFez+LbkIEEZVz5SckeONPy57BnoOMh+YFqhzkZKb5Z+VUBvw2ZXEO5AKbz7BgHBJOT4cw1H77Otb2d/OpiN6tT7wwIEl+FbnEEERlvLFObyUdvgoUB/xAoGARojGO1kqpzoqkw1OI/uyDwsuZJ9PLzGzxEujkNwrbNKceV81RcwF/949AEdX2Kbhh5DjcbRg8jgwZoK7yAvGj0J8ElJmJGCmDuGilWYOApZNJLFB2rj4X24tEzZidqDVINDKXWgmYwwBk0KZBwKanit5aIDk0XohFqEV/t0CQ0ECgYEAjx5FqLNIjP/C+V5QOBchzwewpEI49ToMwutBEXKUEkMj/QADIK6TySHdS32p2WtAtb7fPPI6JRJyVDBPJNdXWKCd21LMDu91IIS5ggcX+MphY5YMN3eG8eFAIPZPujQcaIhcl9bel23mHhGQ2qq+0Zq+yj9OySkqWT2zn91J1IECgYAmWZ6gj8m1oGlQmX+dEoLYKOfDmDObskghiuhuGCAHrZlDW/8XeylVm8sue67nGpWoXojem9WO0LsZKJysajYzjoCUCrbVVfUe8TcNENqYwZ1UsMZkfEPfla7MIIhAN3InurA5Cr6N4fSqSaLM2d73Q/Fo6q93DQGT2m6S3f+QEg==' // 应用私钥
})
//最后我们默认导出即可
module.exports = {
  alipaySdk,
  AlipayFormData
}

