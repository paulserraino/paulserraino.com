---
layout: post
title:  "Objective-C Notes: OOP"
date:   2014-11-1 19:07:59
categories: ios
---

For the past two weeks or so i’ve been teaching myself how to development ios applications. So far, i’ve found Objective C to be a bit tricky at times. It’s syntax is verbose and at first, it feels as if it’s just brute force memorization. I’m beginning to realize (thankfully) that it’s not all memorization. The language is structured in a beautiful way, it just takes some time to get used to the syntax. I’ve decided to share my notes with everyone, in an effort to pass on what i’ve learn so far.

If your background is in object oriented programming and you don't know any Objective-C, than this blog post is for you.


##Methods
----------
{% highlight objective-c%}
// Obj C method prototype
-(void)setFirstName:(NSString *)newFirstName;

//C++ method prototype
void setFirstName (string newFirstName);
{% endhighlight %}

Methods adhere to the following structure:
<br>\[method type]<b>( </b>[return type]<b> )</b>[method name] <b>:</b> ([parameter type])parameter name;

Method Types

- instance method use "-" (a minus sign)
- class method use "+" (a plus sign)

##@interface
----------
Typically @interface is defined in a header file(ClassName.h)
{% highlight objective-c%}
@interface ClassName : ClassParent
//define instance variables, properties, 
//instance methods or class methods 
@end
{% endhighlight %}


##@implementation
----------
Where you would explictly write your instance methods or class methods
{% highlight objective-c%}
#import "ClassName.h" // never forget this
@implementation ClassName

@end
{% endhighlight %}

##@property
----------
Instead of writing a ton of setters and getters for instance variables use properties.
{% highlight objective-c%}
@property (nonatomic, strong) BOOL screenTouched;
@property (nonatomic, weak) NSString* username;
{% endhighlight %}
I'm still not 100% sure what nonatomic means and weak and strong have to do with automatic referance counting (I'll take notes on this later). For more info read about [encapsulating data](https://developer.apple.com/library/mac/documentation/cocoa/conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html)

##Using classes
----------

Example of how to use classes

{% highlight objective-c%}

@interface User : NSObject

	@property (nonatomic) NSString* userName;
	-(void)sayHello;

@end

@implementation User

	-(void)sayHello {
	    NSLog(@"user %@ says hello", [self userName]);
	}

@end

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        User *u1 = [[User alloc] init];
        u1.username = @"someguy42";
        [u1 sayHello] // user someguy42 says hello
    }
    return 0;
}
{% endhighlight %}

##Resources
----------

- [working with objects](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithObjects/WorkingwithObjects.html)
- [nettuts+ on properties](http://code.tutsplus.com/tutorials/objective-c-succinctly-properties--mobile-21994)
- [big nerd ranch obj c](http://www.amazon.com/Objective-C-Programming-Ranch-Guide-Guides/dp/032194206X/ref=sr_1_1?s=books&ie=UTF8&qid=1414880822&sr=1-1&keywords=objective+c)

<br><br>

 <div id="disqus_thread"></div>

  <script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'paulserraino'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
 </script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
