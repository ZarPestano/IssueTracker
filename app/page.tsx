import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={125} pageSize={10} currentPage={13} />;
}
