# 单例模式
## 概念
保证系统只产生该类的一个实例，同时负责向外界提供访问该实例的标准方法

## 使用情景
对于多个程序必须使用同一个配置信息对象时，就需保证该对象唯一性

## 代码实现
### 原理
不允许其他程序用new创建该类对象；在该类创建一个本类实例；对外提供一个方法让其他程序可以获取对象

### 关键实现步骤
- 构造函数私有化
- 在本类中创建一个本类对象
- 定义一个公有方法返回创建的对象

### 饿汉式单例模式
```java
// 类加载时创建对象
class Single {

  private static final Single s = new Single();

  private Single() {}

  public static Single getInstance() {
    return s;
  }

}
```

### 懒汉式单例模式
```java
// 第一次调用getInstance方法时创建对象(延迟加载)
class Single {

  private static Single s = null;

  private Single() { }

  public static Single getInstance() {
    if (s == null)
      s = new Single();
    return s;
	}
}

// 进一步完善：解决多线程安全问题
class Single {

	private static Single s = null;

  private Single() { }

  public static Single getInstance() {
    //解决效率问题
    if (s == null) { 					
      Synchronized(Single.class) { 
        if (s == null)
          s = new Single();
      }
    }
    return s;
  }
}
```
