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
import com.servicehub.models.Service;
import java.util.List;

public class ServiceAdapter extends RecyclerView.Adapter<ServiceAdapter.ServiceViewHolder> {

    private List<Service> serviceList;
    private Context context;

    public ServiceAdapter(List<Service> serviceList, Context context) {
        this.serviceList = serviceList;
        this.context = context;
    }

    @NonNull
    @Override
    public ServiceViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_service, parent, false);
        return new ServiceViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ServiceViewHolder holder, int position) {
        Service service = serviceList.get(position);
        
        holder.tvTitle.setText(service.getTitle());
        holder.tvCategory.setText(service.getCategory());
        holder.tvPrice.setText(String.format("%.0f %s", service.getPrice(), AppConfig.CURRENCY_SYMBOL));
        holder.tvRating.setText(String.format("%.1f", service.getRating()));
        holder.tvReviews.setText(String.format("(%d)", service.getReviewCount()));
        
        // Load image if available
        if (service.getImages() != null && !service.getImages().isEmpty()) {
            Glide.with(context)
                    .load(AppConfig.IMAGE_BASE_URL + service.getImages().get(0))
                    .placeholder(R.drawable.ic_services)
                    .error(R.drawable.ic_services)
                    .into(holder.ivService);
        } else {
            holder.ivService.setImageResource(R.drawable.ic_services);
        }
        
        holder.itemView.setOnClickListener(v -> {
            // TODO: Open service details
        });
    }

    @Override
    public int getItemCount() {
        return serviceList.size();
    }

    static class ServiceViewHolder extends RecyclerView.ViewHolder {
        ImageView ivService;
        TextView tvTitle, tvCategory, tvPrice, tvRating, tvReviews;

        ServiceViewHolder(@NonNull View itemView) {
            super(itemView);
            ivService = itemView.findViewById(R.id.iv_service);
            tvTitle = itemView.findViewById(R.id.tv_title);
            tvCategory = itemView.findViewById(R.id.tv_category);
            tvPrice = itemView.findViewById(R.id.tv_price);
            tvRating = itemView.findViewById(R.id.tv_rating);
            tvReviews = itemView.findViewById(R.id.tv_reviews);
        }
    }
}