"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Grid,
  GridColumn,
  GridDetailRowProps,
} from "@progress/kendo-react-grid";
import employees from "./data/employees";
import { DetailExpandDescriptor } from "@progress/kendo-react-data-tools";
import { SortDescriptor } from "@progress/kendo-data-query";
import userManager from "./AuthService"; // Importing the user manager for OIDC

export default function Home() {
  debugger;
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<any>(null); // Holds user info after login
  const [detailExpand, setDetailExpand] = useState<DetailExpandDescriptor>({
    [employees[1].id]: true,
  });

  const initialSort: SortDescriptor[] = [{ field: "salary", dir: "asc" }];

  // Check if the user is logged in
  useEffect(() => {
    userManager?.getUser().then((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    // Simulate an API call to fetch data
    setData(employees); // Replace with actual fetch logic if needed
  }, []);

  // Handle login
  const handleLogin = () => {
    userManager?.signinRedirectCallback(); // Redirects to the OIDC provider
  };

  // Handle logout
  const handleLogout = () => {
    userManager?.signoutRedirect(); // Logs the user out and redirects
  };

  const DetailComponent = (props: GridDetailRowProps) => {
    const dataItem = props.dataItem;
    return (
      <section>
        <div style={{ padding: "10px" }}>
          <p>
            <strong>Image:</strong>{" "}
            <img src={dataItem.profilePicture} alt={dataItem.name} />
          </p>
          <p>
            <strong>Email Id:</strong> {dataItem.email}
          </p>
          <p>
            <strong>Contact Number:</strong> {dataItem.contactNumber}
          </p>
          <p>
            <strong>Blood Group:</strong> {dataItem.bloodGroup}
          </p>
          <p>
            <strong>Address:</strong> {dataItem.address.street}{" "}
            {dataItem.address.city} {dataItem.address.state}{" "}
            {dataItem.address.postalCode}
          </p>
        </div>
      </section>
    );
  };

  return (
    <div>
      <h1 className="text-4xl font-bold underline mb-4 text-center">
        Employee Directory
      </h1>

      {/* Login/Logout Button */}
      <div className="flex justify-center mb-4">
        {!user ? (
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        ) : (
          <>
            <p>Welcome,,, {user.profile.name}</p>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Employee Grid */}
      {user && (
        <div className="flex justify-center">
          <Grid
            dataItemKey="id"
            rowHeight={60}
            autoProcessData={true}
            sortable={true}
            data={data}
            detail={DetailComponent}
            defaultDetailExpand={detailExpand}
            defaultSort={initialSort}
          >
            <GridColumn
              field="id"
              title="ID"
              width="50px"
              className="text-center"
            />
            <GridColumn
              field="name"
              title="Name"
              width="250px"
              className="text-center"
            />
            <GridColumn
              field="jobTitle"
              title="Job Title"
              width="250px"
              className="text-center"
            />
            <GridColumn
              field="department"
              title="Department"
              width="250px"
              className="text-center"
            />
            <GridColumn
              field="salary"
              title="Salary"
              width="250px"
              className="text-center"
            />
            <GridColumn
              field="country"
              title="Country"
              width="250px"
              className="text-center"
            />
          </Grid>
        </div>
      )}
    </div>
  );
}
