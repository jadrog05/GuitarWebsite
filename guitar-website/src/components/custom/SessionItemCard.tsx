import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type SessionItemProps = {
  item: {
    id: string;
    instruction: string;
    explanation: string | null;
    youtubeUrl: string | null;
    tabUrl: string | null;
    completed: boolean;
    topicTag: string | null;
    position: number;
  };
  onToggleCompleted?: (id: string, completed: boolean) => void;
};

export default function SessionItemCard({ item, onToggleCompleted }: SessionItemProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">{item.instruction}</CardTitle>
          {item.topicTag && (
            <Badge className="mt-1 w-fit" variant="outline">
              {item.topicTag}
            </Badge>
          )}
        </div>
        <Checkbox
          checked={item.completed}
          onCheckedChange={(checked) =>
            onToggleCompleted?.(item.id, Boolean(checked))
          }
          aria-label="Mark as complete"
        />
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {item.explanation && <p className="text-muted-foreground">{item.explanation}</p>}

        <div className="flex flex-wrap gap-2 pt-2">
          {item.youtubeUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1"
            >
              <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer">
                Watch Lesson <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          {item.tabUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1"
            >
              <a href={item.tabUrl} target="_blank" rel="noopener noreferrer">
                View Tab <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
