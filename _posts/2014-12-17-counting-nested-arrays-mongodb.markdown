---
layout: post
title:  "Counting Nested Arrays in MongoDB"
date:   2014-12-17 19:07:59
categories: web
---

My current side project is building a web analytics tool for some my client's websites. So far, it's proving to be more work than I thought, but at least I'm learning alot about MongoDB. 

In this post I'd like share some of what I've learned, mainly counting nested arrays. This is going to be accomplished using MongoDB [aggregates](http://docs.mongodb.org/manual/reference/command/aggregate/#dbcmd.aggregate).

>>####The Goal
>Count the number of pageviews for each page in each website.

<span>I'm starting out with the json shown below.</span>

<div id="shorten" style="height: 334px;
overflow: hidden;">
	
{% highlight objective-c%}
[
  {
    "_id": "548b6ed9acfe832def5b2b99",
    "username": "paulserraino",
    "websites": [
      {
        "_id": "548ca357c1575c000020c175",
        "_domain": "test.com",
        "pages": [
          {
            "path": "\/about",
            "_id": "548e1191dcd6c30000cceeff",
            "pageviews": [
              {
                "_id": "548e4504d79d9a00009ed13b",
                "timestamp": "2014-12-15T02:18:39.410Z"
              },
              {
                "_id": "548e451fd79d9a00009ed13c",
                "timestamp": "2014-12-15T02:18:39.410Z"
              },
              {
                "_id": "548e4531d79d9a00009ed13d",
                "timestamp": "2014-12-15T02:18:39.410Z"
              }
            ],
            "timestamp": "2014-12-14T22:39:07.116Z"
          },
          {
            "path": "\/",
            "_id": "548e119fdcd6c30000ccef00",
            "pageviews": [
              {
                "_id": "548e4550d79d9a00009ed13e",
                "timestamp": "2014-12-15T02:18:39.410Z"
              }
            ],
            "timestamp": "2014-12-14T22:39:07.116Z"
          },
          {
            "path": "\/contact",
            "_id": "548e11a9dcd6c30000ccef01",
            "pageviews": [
              
            ],
            "timestamp": "2014-12-14T22:39:07.116Z"
          }
        ]
      },
      {
        "_domain": "cool.com",
        "_id": "5490fcc58c4947000025cb49",
        "pages": [
          {
            "path": "\/",
            "_id": "5491052e10e5e50000453778",
            "pageviews": [
              
            ],
            "timestamp": "2014-12-17T04:22:36.657Z"
          }
        ]
      }
    ]
  }
]
{% endhighlight %}
</div>
<p>
	<a href="#" style="font-size: 14px;">(show more json)</a>
</p>


##First Step
We need to $unwind the websites array. The [$unwind](http://docs.mongodb.org/manual/reference/operator/aggregation/unwind) keyword is a MongoDB aggregate operator, used to extract arrays out of objects. What this does is, it "plucks" the array's siblings (in this case username) and appends that data to each item in the array, making the array you unwound the parent. In a way, it's almost like a more sophisticated way of flattening an array.

##Second Step
Now that we have the websites array, the next step is to $unwind the pages arrays. After this is done, we can start counting the number of pageviews for each page.

##Third Step
Next we're going to $project our newly unwound data. The [$project](http://docs.mongodb.org/manual/reference/operator/aggregation/project) operator allows us to pick and choose the exect data we want. It also has some nice operators like [$size](http://docs.mongodb.org/manual/reference/operator/aggregation/size), which returns the length of an array. In our case we're going to use $size on the pageviews array to get the total number of pageviews.

##Last Step
Now that we have the number of pageviews, our work here is essentially complete, the only problems is our data looks kinda messy. To clean it up we'll use the [$group](http://docs.mongodb.org/manual/reference/operator/aggregation/group) operator to group the attributes that we want. The first and most important step in grouping is decided what you want to group by, in my case I choose to group by website id. Keep in mind after unwinding a couple of times your data might end up being unorganized, so when you want to regroup choose something very specific to group by.

<span>Translating the steps into code.</span>
{% highlight objective-c%}
var userId = req.params.id || req.query.userId;
UserModel.aggregate([
	{
		$match: { _id: mongoose.Types.ObjectId(userId) }
	},
	{
		$unwind: "$websites"
	},
	{
		$unwind: "$websites.pages"
	},
	{
		$project: {
			websites: {
				_id: 1,
				_domain: 1,
				pages: {
					_id: 1,
					path: 1,
					numOfPageViews: { $size: "$websites.pages.pageviews"}
				}
			}
		}
	},
	{
		$group: {
			_id: "$websites._id", // what you want to group by
			_domain: { $first: "$websites._domain"},

			//creates an array of pages
			pages: {
				$push: "$websites.pages"
			}

		}
	}
])
.exec(function (err, websites){
	if (err) return next(err);
		res.json(websites);
});
{% endhighlight %}

<strong>Important gotcha:</strong> If your id happens to be a string, make sure you convert it to a mongodb objectId using `mongoose.Type.Object(stringId)` 

###final result
{% highlight objective-c%}
[
  {
    "_id": "5490fcc58c4947000025cb49",
    "_domain": "cool.com",
    "pages": [
      {
        "path": "\/",
        "_id": "5491052e10e5e50000453778",
        "numOfPageViews": 0
      }
    ]
  },
  {
    "_id": "548ca357c1575c000020c175",
    "_domain": "test.com",
    "pages": [
      {
        "path": "\/about",
        "_id": "548e1191dcd6c30000cceeff",
        "numOfPageViews": 3
      },
      {
        "path": "\/",
        "_id": "548e119fdcd6c30000ccef00",
        "numOfPageViews": 1
      },
      {
        "path": "\/contact",
        "_id": "548e11a9dcd6c30000ccef01",
        "numOfPageViews": 0
      }
    ]
  }
]
{% endhighlight %}

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