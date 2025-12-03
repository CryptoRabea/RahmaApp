package com.servicehub.ui.main;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SearchView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.servicehub.R;
import com.servicehub.adapters.ServiceAdapter;
import com.servicehub.models.Service;
import com.servicehub.utils.ApiClient;
import com.servicehub.utils.Constants;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.GET;
import retrofit2.http.Query;

public class ServicesFragment extends Fragment implements SearchView.OnQueryTextListener {

    private RecyclerView recyclerView;
    private ServiceAdapter serviceAdapter;
    private List<Service> serviceList;
    private SearchView searchView;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_services, container, false);
        
        initViews(view);
        setupRecyclerView();
        loadServices();
        
        return view;
    }

    private void initViews(View view) {
        recyclerView = view.findViewById(R.id.recycler_view_services);
        searchView = view.findViewById(R.id.search_view);
        searchView.setOnQueryTextListener(this);
    }

    private void setupRecyclerView() {
        serviceList = new ArrayList<>();
        serviceAdapter = new ServiceAdapter(serviceList, getContext());
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(), 2));
        recyclerView.setAdapter(serviceAdapter);
    }

    private void loadServices() {
        ServicesApiService apiService = ApiClient.getClient().create(ServicesApiService.class);
        Call<List<Service>> call = apiService.getServices();

        call.enqueue(new Callback<List<Service>>() {
            @Override
            public void onResponse(Call<List<Service>> call, Response<List<Service>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    serviceList.clear();
                    serviceList.addAll(response.body());
                    serviceAdapter.notifyDataSetChanged();
                } else {
                    Toast.makeText(getContext(), Constants.ERROR_SERVER, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Service>> call, Throwable t) {
                Toast.makeText(getContext(), Constants.ERROR_NETWORK, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        searchServices(query);
        return true;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        if (newText.isEmpty()) {
            loadServices();
        } else {
            searchServices(newText);
        }
        return true;
    }

    private void searchServices(String query) {
        ServicesApiService apiService = ApiClient.getClient().create(ServicesApiService.class);
        Call<List<Service>> call = apiService.searchServices(query);

        call.enqueue(new Callback<List<Service>>() {
            @Override
            public void onResponse(Call<List<Service>> call, Response<List<Service>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    serviceList.clear();
                    serviceList.addAll(response.body());
                    serviceAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<List<Service>> call, Throwable t) {
                Toast.makeText(getContext(), Constants.ERROR_NETWORK, Toast.LENGTH_SHORT).show();
            }
        });
    }

    interface ServicesApiService {
        @GET("services")
        Call<List<Service>> getServices();
        
        @GET("services/search")
        Call<List<Service>> searchServices(@Query("q") String query);
    }
}