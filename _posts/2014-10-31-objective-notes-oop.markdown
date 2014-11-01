---
layout: post
title:  "Objective-C Notes: OOP"
date:   2014-10-31 19:07:59
categories: ios
---

For the past two weeks or so i've been teaching myself how to development ios applications. I've decided to share my notes with everyone.

If your background is in object orited programming and you don't know any Objective-C, than this blog post is for you.

##The Basics
Much like C++, in Objective-C classes are implimented in to seprarate files a 'header' and 'implimentation' file, but unlike C++ you don't use the keyword 'class' to define classes. The difference between a class prototype and implimentation is explict. Instance variables and prototype methods are defined in @interface. Method definitions are in @implimentation.

<span style="font-weight: bold">Person.h</span>
{% highlight objective-c %}

#import <Foundation/Foundation.h>

// classname : superClass
@interface Person : NSObject
{
    //instance variables
    NSString *firstName;
    int age;
}

//methods to set and get instance variables
-(void)setFirstName:(NSString*)newfirstName;
-(NSString*)firstName;
-(void)setAge:(int)newAge;
-(int)age;

@end

{% endhighlight %}

<span style="font-weight: bold">Person.m</span>
{% highlight objective-c %}

#import "Person.h"

@implementation Person

-(void)setFirstName:(NSString *)newfirstName {
    _firstName = newfirstName;
}

-(NSString *)firstName {
    return _firstName;
}

-(void)setAge:(int)newAge {
    _age = newAge;
}

-(int)age {
    return _age;
}

@end
{% endhighlight %}

To alternate between header and implimentation files use: <b>ctrl + command + up arrow<b>

##@property


