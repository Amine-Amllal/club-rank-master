import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  user_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_name?: string;
  reviewer_avatar?: string | null;
  reviewer_email?: string;
}

interface ReviewsListProps {
  reviews: Review[];
  isLoading?: boolean;
}

const ReviewsList = ({ reviews, isLoading = false }: ReviewsListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this member!
      </div>
    );
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 4) return "default";
    if (rating >= 3) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-lg border bg-card p-4 transition-all hover:shadow-md"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.reviewer_avatar || ""} />
                <AvatarFallback className="bg-primary/20">
                  {review.reviewer_name?.[0] ||
                    review.reviewer_email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {review.reviewer_name || review.reviewer_email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.created_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Badge variant={getRatingBadgeVariant(review.rating)}>
                <div className="flex items-center gap-1">
                  {review.rating}
                  <Star
                    className={`h-3 w-3 fill-current ${getRatingColor(
                      review.rating
                    )}`}
                  />
                </div>
              </Badge>
            </div>
          </div>

          {/* Comment */}
          <p className="text-sm text-foreground leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
