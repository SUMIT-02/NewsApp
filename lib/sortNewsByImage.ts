export default function sortNewsByImage(news: NewResponse){
    const newsWithImage = news?.data?.filter((item)=> item.image !== null);
    const newsWithoutImage = news?.data?.filter((item)=> item.image ===null);
    
    
    
    const sortedNewsResponse={
        paginations:news.pagination,
        data : [...newsWithImage , ...newsWithoutImage]

    }
    return sortedNewsResponse ;
}
    
