import * as React from "react";
import clsx from "clsx";
import { CategoryI, NoteI, NoteProps } from "../../interfaces";
import moment from "moment";
import { Tag } from "antd";
import {
  DeleteFilled,
  EditFilled,
  InboxOutlined,
  LoadingOutlined,
  TagOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Note_Modal } from "./note-modal";
import { delete_note, put_notes_archive } from "../../api";

export const Note_Item: React.FC<NoteProps> = ({
  noteData,
  categoriesAllData,
  refetchData,
  refetchCategories,
}) => {
  const [preNoteData, setPreNoteData] = React.useState<NoteI>();

  // Utils
  const [showDetail, setShowDetail] = React.useState<boolean>(false);
  const [isArchiving, setIsArchiving] = React.useState<boolean>(false);
  const [isDeleting, setisDeleting] = React.useState<boolean>(false);

  // Init categories options
  // const [initCategories, setInitCategories] = React.useState<string[]>([]);

  const handler_archieve = async (): Promise<void> => {
    if (preNoteData && preNoteData.id) {
      setIsArchiving(true);

      await put_notes_archive(preNoteData.id);
      await refetchData();

      setIsArchiving(false);
    }
  };

  const handler_delete = async () => {
    if (preNoteData && preNoteData.id) {
      setisDeleting(true);

      await delete_note(preNoteData.id);
      await refetchData();

      setisDeleting(false);
    }
  };

  React.useEffect(() => {
    // console.log("\n\n\n<- Note Item ->", noteData);
    setPreNoteData(noteData);
  }, [noteData]);

  // Init the categories of the note
  // React.useEffect(() => {
  //   if (noteData && noteData.categories.length > 0) {
  //     const stringCategories: string[] = [];

  //     noteData.categories.forEach((categoryItem) =>
  //       stringCategories.push(categoryItem.name)
  //     );

  //     setInitCategories(stringCategories);
  //   }
  // }, [noteData, noteData.categories]);

  return (
    <>
      <div
        className={clsx(
          "flex flex-col justify-center",
          "border border-slate-500 rounded-xl",
          "w-full max-w-[30%] p-6"
        )}
      >
        {/* Note info */}
        <div className="flex justify-between w-full">
          {/* Title */}
          <h3 className="text-xl text-gray-900 font-bold">
            {preNoteData?.title}
          </h3>

          {/* Icons */}
          {preNoteData && preNoteData.id && (
            <div className="flex flex-wrap self-start gap-4 w-auto">
              {/* Archive */}
              {preNoteData && !preNoteData.archived && !isArchiving && (
                <InboxOutlined
                  onClick={handler_archieve}
                  style={{ fontSize: "18px" }}
                />
              )}
              {preNoteData && preNoteData.archived && !isArchiving && (
                <UploadOutlined
                  onClick={handler_archieve}
                  style={{ fontSize: "18px" }}
                />
              )}
              {isArchiving && (
                <LoadingOutlined style={{ fontSize: "18px" }} spin />
              )}

              {/* Edit */}
              <EditFilled
                onClick={() => setShowDetail(true)}
                style={{ fontSize: "18px" }}
              />

              {/* Delete */}
              {!isDeleting && (
                <DeleteFilled
                  onClick={handler_delete}
                  style={{ fontSize: "18px" }}
                />
              )}

              {isDeleting && (
                <LoadingOutlined style={{ fontSize: "18px" }} spin />
              )}
            </div>
          )}
        </div>

        <p className="text-base text-gray-900">
          Created at:{" "}
          <span className="font-medium">
            {moment(preNoteData?.createdAt).format("h:mma - MMMM d, YYYY")}
          </span>
        </p>

        <div className="flex flex-wrap gap-4 w-auto">
          {preNoteData?.categories
            .slice(0, 4)
            .map((categoryItem: CategoryI, index: number) => {
              return (
                <Tag
                  key={`category-note${preNoteData?.id}-${index}`}
                  icon={<TagOutlined />}
                  color="#87CEEB"
                >
                  {categoryItem.name}
                </Tag>
              );
            })}
        </div>
      </div>

      {showDetail && (
        <Note_Modal
          isOpen={showDetail}
          hide={() => setShowDetail(false)}
          typeAction="update"
          titleModal="Edit Note"
          noteData={noteData}
          categoriesAllData={categoriesAllData}
          // initCategories={initCategories}
          isArchiving={isArchiving}
          handler_archieve={handler_archieve}
          isDeleting={isDeleting}
          handler_delete={handler_delete}
          refetchData={refetchData}
          refetchCategories={() => refetchCategories()}
        />
      )}
    </>
  );
};

export default Note_Item;
