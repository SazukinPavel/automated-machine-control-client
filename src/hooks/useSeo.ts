function useSeo() {
  const setTitle = (value: string) => {
    document.title = value || "Загрузка...";
  };

  return {
    setTitle,
  };
}
export default useSeo;
