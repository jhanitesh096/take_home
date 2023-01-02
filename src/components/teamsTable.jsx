import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import {
  getAllTeams,
  getGameDataByTeamId,
  getTeamById,
} from "../services/getAllTeams";
import Button from "react-bootstrap/Button";
import style from "./componentsStyle.module.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import NoDataFound from "../common/noDataFound";
import { CircularProgress } from "@mui/material";

const columns = [
  {
    dataField: "id",
    text: "Team Name",
  },
  {
    dataField: "city",
    text: "City",
    sort: true,
  },
  {
    dataField: "abbreviation",
    text: "Abbrivation",
  },
  {
    dataField: "conference",
    text: "Conference",
  },
  {
    dataField: "division",
    text: "Divison",
  },
];

const tableSearchStyle = {
  width: "50%",
  margin: "1rem 0rem",
};

function TeamsTable({
  toggleDrawer,
  setTeamDetails,
  teams,
  setTeams,
  rowId,
  setRowId,
}) {
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { SearchBar } = Search;

  const fetchTeam = async (page = 1, per_page = 10) => {
    setLoading(true);
    const params = {
      page,
      per_page,
    };
    const res = await getAllTeams(params);
    if (res?.status === 200) {
      setTeams(res?.data?.data);
      setPageInfo(res?.data?.meta);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // fetch all teams
  useEffect(() => {
    fetchTeam();
  }, []);

  const handleNext = () => {
    if (currentPage < pageInfo?.total_pages) {
      setCurrentPage((prev) => prev + 1);
      fetchTeam(currentPage + 1);
    }
  };

  const pageButtonRenderer = () => {
    const handleClick = (e, page) => {
      setCurrentPage(page);
      e.preventDefault();
      fetchTeam(page, 10);
    };
    let allPages = Array.from(Array(pageInfo?.total_pages).keys());
    return (
      <>
        {allPages?.map((pageNumber) => (
          <Button
            onClick={(e) => handleClick(e, pageNumber + 1)}
            key={pageNumber}
            variant={pageNumber + 1 === currentPage ? "secondary" : "primary"}
          >
            {pageNumber + 1}
          </Button>
        ))}
        <Button
          variant={
            currentPage === pageInfo?.total_pages ? "secondary" : "primary"
          }
          disabled={currentPage === pageInfo?.total_pages}
          onClick={handleNext}
        >
          {">"}
        </Button>
      </>
    );
  };
  const getTeamDetailsById = async (season = 2021, id) => {
    let payload = {
      season,
      teamId: id,
    };
    const res = await getGameDataByTeamId(payload);
    if (res.status === 200) {
      setTeamDetails(res?.data?.data);
      toggleDrawer();
    }
  };
  const rowEvents = {
    onClick: (e, row) => {
      getTeamDetailsById(2021, row?.id);
      setRowId(row?.id);
    },
  };
  const rowStyle = (row) => {
    if (row?.id === rowId) {
      return {
        backgroundColor: "lightgray",
      };
    }
    return {
      backgroundColor: "#F8FBFD",
      borderColor: "white",
    };
  };

  return (
    <>
      {teams?.length > 0 ? (
        <ToolkitProvider
          bootstrap4
          keyField='id'
          data={teams}
          columns={columns}
          search
        >
          {(props) => (
            <div className={style.tableWrap}>
              <SearchBar {...props.searchProps} style={tableSearchStyle} />
              <BootstrapTable
                {...props.baseProps}
                noDataIndication='There is no data'
                hover
                rowEvents={rowEvents}
                rowStyle={rowStyle}
                wrapperClasses='table-responsive'
              />
            </div>
          )}
        </ToolkitProvider>
      ) : loading ? (
        <div className={style.progress}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <NoDataFound msg='No Data Found!!!' />
      )}
      {pageInfo?.total_pages > 0 ? (
        <div className={style.pegination}>{pageButtonRenderer()}</div>
      ) : null}
    </>
  );
}

export default TeamsTable;
