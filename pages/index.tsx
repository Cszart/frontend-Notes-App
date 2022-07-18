import * as React from "react";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import clsx from "clsx";

// Interfaces
import { CategoryI, NoteI } from "../interfaces";

// Api
import {
  get_categories_all,
  get_notes_all,
  get_notes_archived,
  get_notes_category,
} from "../api";

// Antd
import { Button, Spin, Select } from "antd";

// Local components
import { Note_Item, Note_Modal } from "../components";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

const loadingIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const { Option } = Select;

const Home: NextPage = () => {
  // // Utils
  const [option_Title, setOption_Title] = React.useState<
    "All Notes" | "Archived Notes" | "Active Notes"
  >("All Notes");
  const [current_option, setCurrent_Option] = React.useState<
    "all" | "archived" | "active"
  >("all");
  const [current_notes_data, setCurrent_Notes_Data] = React.useState<NoteI[]>(
    []
  );

  const [showCreate, setShowCreate] = React.useState<boolean>(false);

  // // Data
  // Use Query makes it easier to fetch and keep data updated on page
  const {
    data: notes_all_data,
    refetch: notes_all_refetch,
    isLoading: notes_all_isLoading,
  } = useQuery(["notes_all_data"], () => get_notes_all());

  const {
    data: notes_archived_data,
    refetch: notes_archived_refetch,
    isLoading: notes_archived_isLoading,
  } = useQuery(["notes_archived_data"], () => get_notes_archived(true));

  const {
    data: notes_active_data,
    refetch: notes_active_refetch,
    isLoading: notes_active_isLoading,
  } = useQuery(["notes_active_data"], () => get_notes_archived(false));

  const { data: categories_all_data, refetch: categories_all_refetch } =
    useQuery(["categories_all_data"], () => get_categories_all());

  // // Functions
  // All option selected
  const all_select = async () => {
    setOption_Title("All Notes");
    setCurrent_Option("all");
  };

  // Archived option selected
  const archived_select = async () => {
    setOption_Title("Archived Notes");
    setCurrent_Option("archived");
  };

  // Active option selected
  const active_select = async () => {
    setOption_Title("Active Notes");
    setCurrent_Option("active");
  };

  // On click archive
  const refetchData = async () => {
    notes_all_refetch();
    notes_active_refetch();
    notes_archived_refetch();
    categories_all_refetch();
  };

  // On change select filter
  const onChangeFilter = async (value: any) => {
    const filteredNotes = await get_notes_category(value);

    setCurrent_Notes_Data(filteredNotes);
  };

  // // Use Effects
  // Check if current option changed and display the data
  React.useEffect(() => {
    if (current_option === "all" && notes_all_data) {
      setCurrent_Notes_Data(notes_all_data);
    }

    if (current_option === "archived" && notes_archived_data) {
      setCurrent_Notes_Data(notes_archived_data);
    }

    if (current_option === "active" && notes_active_data) {
      setCurrent_Notes_Data(notes_active_data);
    }
  }, [current_option, notes_active_data, notes_all_data, notes_archived_data]);

  // Check notes data
  // React.useEffect(() => {
  //   console.log("<- Notes page, all notes data ->", notes_all_data);
  // }, [notes_all_data]);

  // React.useEffect(() => {
  //   console.log("<- Notes page, archived notes data ->", notes_archived_data);
  // }, [notes_archived_data]);

  // React.useEffect(() => {
  //   console.log("<- Notes page, active notes data ->", notes_active_data);
  // }, [notes_active_data]);

  return (
    <>
      {/* Navbar */}
      <div
        className={clsx(
          "flex items-center gap-10",
          "sticky top-0",
          "bg-stone-300 w-full py-4 px-10"
        )}
      >
        <Button
          type="primary"
          className="ml-4 mr-10"
          onClick={() => setShowCreate(true)}
        >
          Create Note
        </Button>

        <p
          onClick={all_select}
          className={clsx("text-lg text-gray-900 mb-0", {
            "font-bold border-b-2 border-[#1890ff]": current_option === "all",
          })}
        >
          All
        </p>

        <p
          onClick={active_select}
          className={clsx("text-lg text-gray-900 mb-0", {
            "font-bold border-b-2 border-[#1890ff]":
              current_option === "active",
          })}
        >
          Active
        </p>

        <p
          onClick={archived_select}
          className={clsx("text-lg text-gray-900 mb-0", {
            "font-bold border-b-2 border-[#1890ff]":
              current_option === "archived",
          })}
        >
          Archived
        </p>
      </div>

      {/* Filter */}
      {categories_all_data && (
        <div className="flex justify-center items-center gap-4 w-full mt-10">
          <Select
            showSearch
            placeholder="Filter by category"
            optionFilterProp="children"
            onChange={onChangeFilter}
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {categories_all_data.map((categoryItem: CategoryI) => {
              return (
                <Option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem.name}
                </Option>
              );
            })}
          </Select>

          <CloseOutlined
            style={{ fontSize: "14px" }}
            onClick={() => {
              setCurrent_Notes_Data(notes_all_data);
            }}
          />
        </div>
      )}

      {/* If notes are being fetched */}
      {(notes_all_isLoading ||
        notes_active_isLoading ||
        notes_archived_isLoading) && (
        <div className="flex justify-center items-center h-auto w-full mt-24">
          <Spin
            indicator={loadingIcon}
            tip="Fetching notes ..."
            className="flex flex-col gap-6"
          />
        </div>
      )}

      {/* Notes information */}
      {!notes_all_isLoading && !notes_archived_isLoading && (
        <div className={clsx("flex flex-col gap-10 w-full p-10")}>
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 ml-10">
            {option_Title}
          </h1>

          <div className="flex flex-wrap gap-6 w-auto">
            {/* Notes */}
            {current_notes_data?.map((notesItem: NoteI, index: number) => {
              return (
                <Note_Item
                  key={`note-item-${index}`}
                  noteData={notesItem}
                  categoriesAllData={categories_all_data}
                  refetchData={refetchData}
                  refetchCategories={() => categories_all_refetch()}
                />
              );
            })}
          </div>
        </div>
      )}

      {showCreate && (
        <Note_Modal
          isOpen={showCreate}
          hide={() => setShowCreate(false)}
          typeAction="create"
          titleModal="Create Note"
          categoriesAllData={categories_all_data}
          refetchData={refetchData}
          refetchCategories={() => categories_all_refetch()}
        />
      )}
    </>
  );
};

export default Home;
