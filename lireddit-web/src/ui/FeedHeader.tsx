import React, { FC, MouseEventHandler, ReactNode } from "react";
import { Button } from "./Button";

export interface FeedProps {
  emptyPlaceholder: ReactNode;
}

export interface FeedHeaderProps {
  title: string;
  actionTitle: string;
  onActionClicked: MouseEventHandler<HTMLButtonElement>;
}

export const FeedHeader: FC<FeedHeaderProps> = ({
  actionTitle,
  onActionClicked,
  title,
}) => {
  return (
    <div className="flex justify-between items-end mb-5 ml-4">
      <h4 className="text-primary-100">{title}</h4>
      <Button
        data-testid="feed-action-button"
        transition
        onClick={onActionClicked}
      >
        {actionTitle}
      </Button>
    </div>
  );
};
