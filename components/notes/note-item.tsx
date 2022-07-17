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

export const Note_Item: React.FC<NoteProps> = ({ noteData, refetchData }) => {
  const [preNoteData, setPreNoteData] = React.useState<NoteI>();

  // Utils
  const [showDetail, setShowDetail] = React.useState<boolean>(false);
  const [isArchiving, setIsArchiving] = React.useState<boolean>(false);
  const [isDeleting, setisDeleting] = React.useState<boolean>(false);

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

  return (
    <>
      <div
        className={clsx(
          "flex flex-wrap justify-between items-center",
          "border border-slate-500 rounded-xl",
          "w-full max-w-[30%] p-6"
        )}
      >
        {/* Note info */}
        <div className="flex flex-col w-auto">
          <h3 className="text-xl text-gray-900 font-bold">
            {preNoteData?.title}
          </h3>
          <p>
            Created at:{" "}
            {moment(preNoteData?.createdAt).format("h:mma - MMMM d, YYYY")}
          </p>

          <div className="flex flex-wrap gap-4 w-auto">
            {preNoteData?.categories
              .slice(0, 3)
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

      {showDetail && (
        <Note_Modal
          isOpen={showDetail}
          hide={() => setShowDetail(false)}
          typeAction="update"
          titleModal="Edit Note"
          noteData={noteData}
          isArchiving={isArchiving}
          handler_archieve={handler_archieve}
          isDeleting={isDeleting}
          handler_delete={handler_delete}
          refetchData={refetchData}
        />
      )}
    </>
  );
};

export default Note_Item;
