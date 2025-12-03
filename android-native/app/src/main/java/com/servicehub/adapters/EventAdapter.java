package com.servicehub.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.servicehub.R;
import com.servicehub.config.AppConfig;
import com.servicehub.models.Event;
import java.util.List;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.EventViewHolder> {

    private List<Event> eventList;
    private Context context;

    public EventAdapter(List<Event> eventList, Context context) {
        this.eventList = eventList;
        this.context = context;
    }

    @NonNull
    @Override
    public EventViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_event, parent, false);
        return new EventViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull EventViewHolder holder, int position) {
        Event event = eventList.get(position);
        
        holder.tvTitle.setText(event.getTitle());
        holder.tvDate.setText(event.getDate());
        holder.tvTime.setText(event.getTime());
        holder.tvLocation.setText(event.getLocation());
        holder.tvPrice.setText(String.format("%.0f %s", event.getPrice(), AppConfig.CURRENCY_SYMBOL));
        
        // Load image if available
        if (event.getImages() != null && !event.getImages().isEmpty()) {
            Glide.with(context)
                    .load(AppConfig.IMAGE_BASE_URL + event.getImages().get(0))
                    .placeholder(R.drawable.ic_events)
                    .error(R.drawable.ic_events)
                    .into(holder.ivEvent);
        } else {
            holder.ivEvent.setImageResource(R.drawable.ic_events);
        }
        
        holder.itemView.setOnClickListener(v -> {
            // TODO: Open event details
        });
    }

    @Override
    public int getItemCount() {
        return eventList.size();
    }

    static class EventViewHolder extends RecyclerView.ViewHolder {
        ImageView ivEvent;
        TextView tvTitle, tvDate, tvTime, tvLocation, tvPrice;

        EventViewHolder(@NonNull View itemView) {
            super(itemView);
            ivEvent = itemView.findViewById(R.id.iv_event);
            tvTitle = itemView.findViewById(R.id.tv_title);
            tvDate = itemView.findViewById(R.id.tv_date);
            tvTime = itemView.findViewById(R.id.tv_time);
            tvLocation = itemView.findViewById(R.id.tv_location);
            tvPrice = itemView.findViewById(R.id.tv_price);
        }
    }
}