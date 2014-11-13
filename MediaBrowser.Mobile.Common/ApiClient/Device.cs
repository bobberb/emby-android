﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediaBrowser.Model.ApiClient;
using MediaBrowser.Model.Devices;

namespace MediaBrowser.Mobile.Common.ApiClient
{
    public class Device : IDevice
    {
        public event EventHandler<EventArgs> ResumeFromSleep;

        public Device(Xamarin.Forms.Labs.IDevice device)
        {
            DeviceId = device.Id;
            DeviceName = device.Name;
        }

        public string DeviceId { get; private set; }

        public string DeviceName { get; private set; }

        public Task UploadFile(LocalFileInfo file, IApiClient apiClient, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LocalFileInfo>> GetLocalPhotos()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LocalFileInfo>> GetLocalVideos()
        {
            throw new NotImplementedException();
        }
    }
}