import {categories} from "../constants";
import fetchNews from "../lib/fetchNews";
// Header from "./Header";
async function Homepage() {
  // fetching the news data
  const news:NewsResponse = await fetchNews(categories.join(","),"");

  console.log(news)
  
  return <div>{/*NewsList news*/}</div>;
  
}

export default Homepage;