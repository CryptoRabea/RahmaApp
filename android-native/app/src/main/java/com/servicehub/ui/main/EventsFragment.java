package com.servicehub.ui.main;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.servicehub.R;
import com.servicehub.adapters.EventAdapter;
import com.servicehub.models.Event;
import com.servicehub.utils.ApiClient;
import com.servicehub.utils.Constants;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.http.GET;

public class EventsFragment extends Fragment {

    private RecyclerView recyclerView;
    private EventAdapter eventAdapter;
    private List<Event> eventList;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_events, container, false);
        
        initViews(view);
        setupRecyclerView();
        loadEvents();
        
        return view;
    }

    private void initViews(View view) {
        recyclerView = view.findViewById(R.id.recycler_view_events);
    }

    private void setupRecyclerView() {
        eventList = new ArrayList<>();
        eventAdapter = new EventAdapter(eventList, getContext());
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(eventAdapter);
    }

    private void loadEvents() {
        EventsApiService apiService = ApiClient.getClient().create(EventsApiService.class);
        Call<List<Event>> call = apiService.getEvents();

        call.enqueue(new retrofit2.Callback<List<Event>>() {
            @Override
            public void onResponse(Call<List<Event>> call, Response<List<Event>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    eventList.clear();
                    eventList.addAll(response.body());
                    eventAdapter.notifyDataSetChanged();
                } else {
                    Toast.makeText(getContext(), Constants.ERROR_SERVER, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Event>> call, Throwable t) {
                Toast.makeText(getContext(), Constants.ERROR_NETWORK, Toast.LENGTH_SHORT).show();
            }
        });
    }

    interface EventsApiService {
        @GET("events")
        Call<List<Event>> getEvents();
    }
}