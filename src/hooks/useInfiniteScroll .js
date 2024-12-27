import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (fetchData, pageSize = 10) => {
    const observerRef = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [hasMore, setHasMore] = useState(true);


    const loadMoreData = async () => {
        setLoading(true);
        try {
            const data = await fetchData(pageIndex, pageSize);
            // console.log(data);
            const newData = data || [];

            setDataList((prev) => [...prev, ...newData]);


            if (newData.length < pageSize) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (hasMore) {
            loadMoreData();
        }
    }, [pageIndex]);
    const refreshData = async () => {
        setPageIndex(0);
        setDataList([]);
        setHasMore(true);

        await loadMoreData();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setPageIndex((prev) => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [loading, hasMore]);

    return { dataList, loading, hasMore, observerRef, setDataList, refreshData };
};

export default useInfiniteScroll;
