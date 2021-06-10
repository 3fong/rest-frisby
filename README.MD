# Frisby.js 

rest测试框架.

- 请求demo

```code
const frisby = require('frisby');

it ('should return a status of 200', function () {
  return frisby
    .get('http://api.example.com')
    .expect('status', 200);
});
```

- 响应解析

```code
const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions


it ('should return a status of 200', function () {
  return frisby
    .get('https://jsonfeed.org/feed.json')
    .expect('status', 200)
    .expect('json', 'version', 'https://jsonfeed.org/version/1')
    .expect('json', 'title', 'JSON Feed')
    .expect('jsonTypes', 'items.*', { // Assert *each* object in 'items' array
      'id': Joi.string().required(),
      'url': Joi.string().uri().required(),
      'title': Joi.string().required(),
      'date_published': Joi.date().iso().required(),
    });
});

```

- 运行检查

expect(handler,[...args])

```code
status - Check HTTP status
header - Check HTTP header key + value
json - Match json structure + values
jsonStrict - Match EXACT json structure + values (extra keys not tested for cause test failures)
jsonTypes - Match json structure + value types
jsonTypesStrict - Match EXACT json structure + value types (extra keys not tested for cause test failures)
bodyContains - Match partial body content (string or regex)

```