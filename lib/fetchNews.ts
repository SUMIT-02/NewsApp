import { gql } from "graphql-request";
import NewResponse from "./sortNewsByImage";
const fetchNews= async (
    category?:category | string ,
    keywords?:string,
    isDynamic?:boolean
) => {
    const query = gql` 
    query MyQuery (
        $access_key: String!
        $categories: String!
        $keywords: String
        ) {
        myQuery(
          access_key: $ 51331bb67d71c55948ee078204252303
          categories: $categories
          countries: "gb"
          sort:"published_desc"
          keywords: $keywords
          ) {
          data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }
      
`;

// fetching using nextjs caching

const res=await fetch('https://mosonmagyarovar.stepzen.net/api/needled-eagle/__graphql',{
  method : 'POST' , 
  cache:isDynamic ? "no-cache" : "default",
  next : isDynamic ? { revalidate : 0} : {revalidate : 20} ,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Apikey ${'process.env.mosonmagyarovar::stepzen.net+1000::8efadbfbebd834e44ebcf6d94564c8b0b0d1aef88996d41255e8283ed79090c7'}`,
  },
  body : JSON.stringify({
    query,
    variables: {
      access_key: 'process.env.51331bb67d71c55948ee078204252303',
      categories: category,
      keywords: keywords,
    },
  }),
})

  console.log(
    "LOADING NEW DATA FROM API FOR category >>>",
    category,
    keywords
  
  );
  
  const newResponse = await res.json();

   //sorting function by Images vs not images present
   const news = sortNewsByImage(newResponse.data.myQuery);
   return news;
};
export default fetchNews;